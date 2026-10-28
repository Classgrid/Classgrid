import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { RagChunk } from "@/lib/models/RagChunk";
import { embedText } from "@/lib/ai/embedding";

export async function GET(req: Request) {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI as string);
    }
    
    // 1. Delete fake chunks
    const delResult1 = await RagChunk.deleteMany({ documentType: "fake-test-document" });
    const delResult2 = await RagChunk.deleteMany({ documentId: "test_document_001" });
    const delResult3 = await RagChunk.deleteMany({ pageSlug: "about-us" });
    
    // 2. Add real about-us chunks
    const realContent = `
About Us
We build an AI agent that does real work for you, so you can focus on what matters.

Our Story
The journey started during my first semester of engineering college when I saw how much everyday work was still slow, manual, and spread across too many separate tools. Seeing these everyday problems inspired me to build a better digital solution.

What began as a simple idea gradually evolved into Classgrid AI, an AI agent at https://chat.classgrid.in. The goal is to create a secure and modern AI agent that can research, read files, run code, make documents and reports, and work inside the apps people already use, all in one place.

— Nikhil Shinde, Founder of Classgrid

What is ClassGrid?
ClassGrid makes Classgrid AI, an AI agent available at https://chat.classgrid.in. In Agent mode it researches the web with sources, reads files (PDF, Word, Excel, PowerPoint, CSV, images, audio), runs Python and Node code in a private sandbox, and makes reports, PDFs, documents, images, and websites. It also has a Library of saved files, Schedules for daily briefs, reminders and reports by email and WhatsApp, memory, shareable chats, and long background tasks of up to 48 hours that report back on WhatsApp.

What We Do
We make everyday work easier with an AI agent that works as you inside connected apps like Gmail, Google Drive, Calendar, Classroom, Microsoft, Slack, Notion, GitHub, Vercel, Canva, Zoom, Spotify and more. You can message or call the Classgrid WhatsApp number, and an AI answers, takes your task, and the agent works in the background before replying on WhatsApp. For developers, Project Mode lets the agent work inside your GitHub repo in a private browser code editor, save work as pull requests through the Classgrid GitHub app, and deploy to Vercel with your own account.

Why Choose Us?
Classgrid AI does not just answer questions; it does the work. You can choose from models like DeepSeek, Claude, GLM, Kimi, Qwen, Mistral, NVIDIA Nemotron and more. Pricing is simple: free usage that refills, then pay-as-you-go top-ups. Anyone can create an account at https://chat.classgrid.in, and businesses can book a demo to talk to our team.

Mission & Vision
Our Mission
To help people get real work done faster through a secure, AI-powered agent that works across the apps and tools they already use.

Our Vision
To make a capable AI agent accessible to everyone in India and beyond, by creating intelligent, secure, and connected systems for the future of work.

Core Values
What We Stand For
Trust Before Everything
User data, connected apps, and operational reliability are handled with security, responsibility, and long-term trust at the core of every system.
    `.trim();

    const chunk1 = realContent.substring(0, realContent.indexOf("Mission & Vision")).trim();
    const chunk2 = realContent.substring(realContent.indexOf("Mission & Vision")).trim();

    const emb1 = await embedText(chunk1);
    const emb2 = await embedText(chunk2);

    const docId = `about-us-${Date.now()}`;

    await RagChunk.create({
      documentId: docId,
      documentType: "page",
      chunkIndex: 0,
      chunkText: chunk1,
      pageSlug: "about-us",
      pageTitle: "About Us",
      section: "Our Story & What is Classgrid",
      contentType: "markdown",
      embedding: emb1,
      embeddingModel: "Xenova/all-MiniLM-L6-v2",
      embeddingDimensions: 384,
    });

    await RagChunk.create({
      documentId: docId,
      documentType: "page",
      chunkIndex: 1,
      chunkText: chunk2,
      pageSlug: "about-us",
      pageTitle: "About Us",
      section: "Mission, Vision, Values",
      contentType: "markdown",
      embedding: emb2,
      embeddingModel: "Xenova/all-MiniLM-L6-v2",
      embeddingDimensions: 384,
    });

    const forumChunks = await RagChunk.find({ chunkText: { $regex: /forum is not yet launched/i } });
    let updatedForumChunks = 0;
    for (const chunk of forumChunks) {
      chunk.chunkText = chunk.chunkText.replace(/The ClassGrid Forum is not yet launched.*?\./gi, "The old ClassGrid Forum is no longer available. For help, use Support Tickets at https://classgrid.in/support/ticket.");
      chunk.chunkText = chunk.chunkText.replace(/ClassGrid Forum is not yet launched/gi, "old ClassGrid Forum is no longer available. For help, use Support Tickets at https://classgrid.in/support/ticket.");
      await chunk.save();
      updatedForumChunks++;
    }
    
    // Also try finding it by just 'upcoming community forum'
    const forumChunks2 = await RagChunk.find({ chunkText: { $regex: /upcoming community forum/i } });
    for (const chunk of forumChunks2) {
      chunk.chunkText = chunk.chunkText.replace(/not yet launched.*?\./gi, "no longer available. For help, use Support Tickets at https://classgrid.in/support/ticket.");
      chunk.chunkText = chunk.chunkText.replace(/upcoming community forum/gi, "old community forum (no longer available)");
      await chunk.save();
      updatedForumChunks++;
    }

    // 3. Inject dedicated Classgrid Forum chunk
    const forumContent = `
The old ClassGrid Forum (community platform) is no longer available.
For everything the forum was used for, use Support Tickets instead:
1. Ask Questions: Ask the Classgrid team about Classgrid AI and how to use it.
2. Anyone Can Use It: People with or without a chat.classgrid.in account can use Support Tickets; they just log in on the website with an email code.
3. Share Feedback: Report issues, request new features, and talk directly with the ClassGrid team.
Support Tickets are available right now at https://classgrid.in/support/ticket
    `.trim();

    // Delete any old forum chunks we might have injected to avoid duplicates
    await RagChunk.deleteMany({ documentId: "classgrid-forum-official" });

    const forumEmb = await embedText(forumContent);
    await RagChunk.create({
      documentId: "classgrid-forum-official",
      documentType: "page",
      chunkIndex: 0,
      chunkText: forumContent,
      pageSlug: "community",
      pageTitle: "Classgrid Forum",
      section: "What is the Classgrid Forum",
      contentType: "markdown",
      embedding: forumEmb,
      embeddingModel: "Xenova/all-MiniLM-L6-v2",
      embeddingDimensions: 384,
    });

    return NextResponse.json({
      success: true,
      deletedFakes: delResult1.deletedCount + delResult2.deletedCount,
      deletedOldAbout: delResult3.deletedCount,
      updatedForumChunks,
      message: "Fake history removed, real About Us content injected, and Forum RAG context successfully injected."
    });

  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
