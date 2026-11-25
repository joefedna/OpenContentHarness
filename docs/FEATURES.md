# OpenContent feature map

Everything a media generation harness could have, for solo creators, agencies and marketing teams. This is the master list we build from, one item at a time.

## How to read this

Each feature has an ID, a status and a priority.

- **Status:** `[x]` built in OpenContent · `[~]` exists in upstream OpenCode, needs adapting · `[ ]` not started
- **Priority:**
  - **P0:** the core loop; without it the product doesn't work
  - **P1:** expected by serious users; competitive parity
  - **P2:** differentiator; makes people switch
  - **P3:** moonshot or niche; later
- **IDs** are `AREA-NN`. Reference them in branches, commits and issues (for example `vid-transcript-edit`, "feat(media): VID-14 edit by transcript").

Guiding principle: **content as code.** Every medium has a file format the agent edits, a command that renders or checks it, and a panel where the human previews and adjusts it. Agent and human edit the same file.

---

## 1. Core harness (CORE)

- [x] **CORE-01** Content system prompt replacing the coding prompt · P0
- [x] **CORE-02** Content agents: Writer (default), Strategist, Editor, Researcher, Fact-checker · P0
- [x] **CORE-03** Slash commands for content workflows · P0
- [x] **CORE-04** Playbook skills loaded on demand · P0
- [~] **CORE-05** Goal mode: agent works until a judge confirms the brief is met (`/goal`) · P0
- [ ] **CORE-06** Quality gate after every draft: critique, fact check and brand check run automatically, Writer revises until it passes or hits a round limit · P0
- [ ] **CORE-07** Rename and rebrand: binary, config folders (`.opencontent/`), docs, telemetry, update channel · P0
- [ ] **CORE-08** Turn off or hide coding-only features (LSP hooks, code review, patch tools) by default; keep them available as an optional "dev" profile · P1
- [ ] **CORE-09** Content-aware context compaction: keep the brief, brand and current draft, drop exploration · P1
- [~] **CORE-10** Subagents in parallel (research five angles at once, draft three variants at once) · P0
- [ ] **CORE-11** Variant mode: generate N versions of any piece side by side and pick or merge · P1
- [ ] **CORE-12** Content-specific permissions: always ask before publishing, spending above a budget, cloning a voice or using a likeness · P0
- [~] **CORE-13** Background jobs for long renders and generations with notifications · P0
- [ ] **CORE-14** Media job queue with retries, priorities, cancellation and cost estimates · P1
- [~] **CORE-15** Session history, forking and undo · P0
- [ ] **CORE-16** Media-aware undo: revert a render, image edit or timeline change, not only text files · P1
- [ ] **CORE-17** Human-in-the-loop checkpoints: approve the outline, then the draft, then the visuals · P1
- [ ] **CORE-18** Autopilot mode: brief in, finished multi-platform package out, with one approval at the end · P2
- [ ] **CORE-19** Reasoning about cost: agent picks cheaper models for drafts and expensive ones for finals · P2
- [ ] **CORE-20** Multimodal input everywhere: drop in images, video, audio, PDFs, URLs and screenshots as context · P0

## 2. Workspace, projects and assets (WS)

- [x] **WS-01** Conventional folders: `brands/`, `briefs/`, `drafts/`, `published/`, `research/`, `swipe/`, `plans/` · P0
- [ ] **WS-02** `/init` for content: scaffold a workspace (solo, agency or team template) · P0
- [ ] **WS-03** Asset library: index every image, video, audio file and font with tags, descriptions and embeddings · P0
- [ ] **WS-04** Semantic asset search: "find the clip where she laughs", "logo on dark background" · P1
- [ ] **WS-05** Automatic tagging and captioning of imported media (vision model, speech transcript) · P1
- [ ] **WS-06** Large-file handling: proxies, thumbnails and previews instead of loading raw 4K files · P0
- [ ] **WS-07** Versioning for binary media (Git LFS or content-addressed store) with readable history · P1
- [ ] **WS-08** Project manifests: one file listing every deliverable for a campaign and its status · P1
- [ ] **WS-09** Content inventory: everything ever published, with links, dates, performance and source files · P1
- [ ] **WS-10** Import from Google Drive, Dropbox, Notion, Frame.io, YouTube channel, podcast RSS · P1
- [ ] **WS-11** Cloud sync and shared workspaces for teams · P2
- [ ] **WS-12** Stock media search and licensing (Pexels, Unsplash, Pixabay, Storyblocks, Getty) with license stored per asset · P1
- [ ] **WS-13** Duplicate and near-duplicate detection across the library · P2
- [ ] **WS-14** Storage quotas, cleanup of unused renders, archive to cold storage · P2

## 3. Brand intelligence (BRAND)

- [x] **BRAND-01** Brand profile files (`brands/<slug>/BRAND.md`) loaded into every request · P0
- [x] **BRAND-02** Multiple brands per workspace with `/brand` switching · P0
- [x] **BRAND-03** `/onboard` interview that builds the brand profile from a website, samples and questions · P0
- [ ] **BRAND-04** Voice extraction: learn the voice from 20+ past posts automatically, with measurable traits (sentence length, reading level, vocabulary, emoji rate) · P1
- [ ] **BRAND-05** Voice score: rate any draft for how on-brand it sounds, with highlighted off-voice lines · P1
- [ ] **BRAND-06** Visual identity: logo files, colors, fonts, spacing, imagery style, do and don't examples · P0
- [ ] **BRAND-07** Brand kit import from a website (colors, fonts, logo), from Figma or Canva, or from a PDF brand book · P1
- [ ] **BRAND-08** Visual brand check: flag off-palette colors, wrong fonts, logo misuse in generated images and videos · P2
- [ ] **BRAND-09** Banned words, required disclaimers and legal phrasing enforced as hard rules · P0
- [ ] **BRAND-10** Personas: multiple audience personas per brand, and drafts targeted to one · P1
- [ ] **BRAND-11** Spokesperson profiles: per-person voice for founders and executives in the same brand · P1
- [ ] **BRAND-12** Brand memory: corrections the user makes become rules automatically ("never say 'customers', say 'members'") · P1
- [ ] **BRAND-13** Brand voice clone (audio) and approved likeness (avatar) stored with consent records · P2
- [ ] **BRAND-14** Competitor profiles: their positioning, voice and top content, for differentiation · P1
- [ ] **BRAND-15** Brand consistency report across all published content · P2

## 4. Research and ideation (RES)

- [~] **RES-01** Web search and page fetching · P0
- [x] **RES-02** Researcher subagent that saves sourced findings to `research/` · P0
- [ ] **RES-03** Trend discovery: rising topics on Google Trends, Reddit, X, TikTok, YouTube, Hacker News, news · P1
- [ ] **RES-04** Social listening: what the audience is saying about a topic or brand · P2
- [ ] **RES-05** Competitor content teardown: top posts, hooks, formats, posting cadence, engagement · P1
- [ ] **RES-06** Viral content analysis: why a post or video worked (hook, structure, pacing, emotion) · P1
- [ ] **RES-07** Swipe file: save examples from anywhere (URL, screenshot, video) with automatic breakdown · P0
- [ ] **RES-08** Audience questions mining: Reddit, Quora, comments, "People also ask", support tickets · P1
- [ ] **RES-09** Keyword research: volume, difficulty, intent, clusters (via SEO APIs) · P1
- [ ] **RES-10** Idea generator from pillars, trends and past winners, with scores · P1
- [ ] **RES-11** Idea bank: backlog of ideas with tags, status and votes · P1
- [ ] **RES-12** Interview mode: the agent interviews the creator to extract stories and opinions, then turns the transcript into content · P1
- [ ] **RES-13** Source ingestion: PDFs, papers, reports, books, transcripts summarized into reusable notes · P1
- [ ] **RES-14** YouTube and podcast research: transcribe and search any public video or episode · P1
- [ ] **RES-15** Data-driven content: pull stats from CSVs or APIs and turn them into charts and posts · P2
- [ ] **RES-16** Original research helper: design a survey, analyze the results, write the report · P3

## 5. Strategy and planning (PLAN)

- [x] **PLAN-01** Strategist agent restricted to briefs, plans and research · P0
- [x] **PLAN-02** `/brief` content briefs · P0
- [x] **PLAN-03** `/calendar` content calendar · P0
- [ ] **PLAN-04** Content pillars and topic clusters per brand · P1
- [ ] **PLAN-05** Campaign planner: launch, evergreen, seasonal, event; with deliverables, owners and dates · P1
- [ ] **PLAN-06** Funnel mapping: awareness, consideration, conversion and retention content per persona · P1
- [ ] **PLAN-07** Calendar view (UI) with drag and drop, platform colors and status · P1
- [ ] **PLAN-08** Seasonal and holiday calendar by country and industry · P2
- [ ] **PLAN-09** Positioning workshop: category, differentiators, messaging hierarchy · P1
- [ ] **PLAN-10** Offer and launch copy kit: name ideas, taglines, value props, objections · P1
- [ ] **PLAN-11** Goal tracking: plan tied to KPIs, compared with actual results · P2
- [ ] **PLAN-12** Resource planning: time, budget and generation credits per campaign · P2

## 6. Writing (WRITE)

Formats the Writer must handle natively, each with a template, platform rules and a checker.

- [x] **WRITE-01** Social posts: LinkedIn, X, Threads, Bluesky, Facebook, Instagram captions · P0
- [x] **WRITE-02** X threads (`/thread`) · P0
- [x] **WRITE-03** Newsletters with subject lines (`/newsletter`) · P0
- [ ] **WRITE-04** Long-form blog articles and SEO articles · P0
- [ ] **WRITE-05** Video scripts: short-form, YouTube long-form, explainer, ad, tutorial · P0
- [ ] **WRITE-06** Podcast: episode outlines, intros, show notes, ad reads · P1
- [ ] **WRITE-07** Email sequences: welcome, nurture, launch, abandoned cart, re-engagement · P1
- [ ] **WRITE-08** Landing pages and sales pages · P1
- [ ] **WRITE-09** Ad copy: Meta, Google, LinkedIn, TikTok, YouTube, X, Reddit; with variant matrices · P0
- [ ] **WRITE-10** Carousels: slide-by-slide copy plus layout handoff to the canvas · P0
- [ ] **WRITE-11** Product descriptions at scale from a catalog · P1
- [ ] **WRITE-12** Case studies and testimonials from interview transcripts · P1
- [ ] **WRITE-13** Press releases and PR pitches · P2
- [ ] **WRITE-14** Ebooks, lead magnets, whitepapers, reports · P1
- [ ] **WRITE-15** Presentations and pitch decks (outline and slides) · P1
- [ ] **WRITE-16** Speeches, webinar scripts, talking points · P2
- [ ] **WRITE-17** Books: outline, chapters, consistency across a long manuscript · P2
- [ ] **WRITE-18** Fiction and storytelling: characters, story bible, series continuity · P3
- [ ] **WRITE-19** Community content: replies, comments, DMs, Discord announcements · P1
- [ ] **WRITE-20** Help center and product docs in brand voice · P2
- [ ] **WRITE-21** Microcopy: UI text, push notifications, SMS · P2
- [ ] **WRITE-22** Song lyrics and jingles (handoff to music generation) · P3
- [ ] **WRITE-23** Interactive formats: quizzes, polls, calculators · P3

## 7. Editing and quality (QA)

- [x] **QA-01** `/critique` scored review against brief and brand · P0
- [x] **QA-02** `/de-ai` removal of AI-writing tells · P0
- [x] **QA-03** Editor and Fact-checker subagents · P0
- [ ] **QA-04** Automatic lint after every edit (the content equivalent of compiler errors): banned words, length limits, reading level, passive voice, AI tells · P0
- [ ] **QA-05** Style guide engine (Vale-compatible rules) per brand · P1
- [ ] **QA-06** Claim tracking: every factual claim linked to a source; unsourced claims block publishing · P1
- [ ] **QA-07** Plagiarism and originality check · P1
- [ ] **QA-08** Grammar and spelling, US/UK/other locale aware · P0
- [ ] **QA-09** Readability scores (Flesch, grade level) with targets per audience · P1
- [ ] **QA-10** Hook strength scoring and predicted performance · P2
- [ ] **QA-11** Inclusive language and sensitivity check · P1
- [ ] **QA-12** Legal and compliance check: health, financial and comparative claims, required disclosures (FTC #ad), regulated industries · P1
- [ ] **QA-13** Platform validator: character limits, hashtag counts, link rules, image specs, video specs per platform · P0
- [ ] **QA-14** Synthetic audience panel: simulated personas react to a draft before it ships · P2
- [ ] **QA-15** Track changes and suggestion mode, so humans review edits instead of rewrites · P1
- [ ] **QA-16** Visual QA for images and video: text legibility, safe zones, cropping, artifacts, misspelled text in images · P1
- [ ] **QA-17** Audio QA: loudness (LUFS) targets, clipping, silence, mispronunciations · P1
- [ ] **QA-18** Accessibility: alt text, captions, color contrast, audio description · P1

## 8. Images (IMG)

- [~] **IMG-01** Image generation through providers (OpenAI, Google, Flux, Ideogram, Recraft, Stability, Midjourney-compatible APIs) · P0
- [ ] **IMG-02** Local image generation through ComfyUI or Diffusers workflows · P1
- [ ] **IMG-03** Prompt library and prompt enhancement per model · P0
- [ ] **IMG-04** Brand-consistent generation: style references, brand colors, LoRA or fine-tune per brand · P1
- [ ] **IMG-05** Character and product consistency across images (reference images, IP adapters) · P1
- [ ] **IMG-06** Image editing by instruction ("make the sky sunset", "remove the person on the left") · P0
- [ ] **IMG-07** Inpainting, outpainting and generative fill · P1
- [ ] **IMG-08** Background removal and replacement · P0
- [ ] **IMG-09** Upscaling, denoising, restoration, face restoration · P1
- [ ] **IMG-10** Resize and smart crop to every platform aspect ratio with subject awareness · P0
- [ ] **IMG-11** Text in images: accurate typography, or rendered text layers over generated art · P0
- [ ] **IMG-12** Thumbnails: YouTube thumbnail generator with face, text and contrast rules, plus A/B variants · P1
- [ ] **IMG-13** Quote cards, stat cards and social graphics from templates · P0
- [ ] **IMG-14** Product photography: product on generated scenes, lifestyle shots, packshots · P1
- [ ] **IMG-15** Mockups: device, packaging, merch, billboard · P2
- [ ] **IMG-16** Charts, infographics and diagrams from data or text · P1
- [ ] **IMG-17** Memes from templates and trending formats · P2
- [ ] **IMG-18** Vector output (SVG), icons and illustrations · P2
- [ ] **IMG-19** Image analysis: describe, extract text, critique composition · P0
- [ ] **IMG-20** Batch processing: apply one edit to 500 images · P1
- [ ] **IMG-21** Color grading and filters, brand looks as presets · P2
- [ ] **IMG-22** Photo editing basics: crop, rotate, exposure, contrast, retouch · P1

## 9. Design canvas (CANVAS)

- [ ] **CANVAS-01** Canvas document format the agent edits as JSON (layers, frames, text, images, shapes, components) · P0
- [ ] **CANVAS-02** Canvas panel in the desktop and web app (OpenPencil, Excalidraw or Penpot based) · P0
- [ ] **CANVAS-03** Agent and human edit the same canvas live; agent changes show as they happen · P1
- [ ] **CANVAS-04** Templates: carousels, story frames, posts, banners, thumbnails, ads, slides, one-pagers · P0
- [ ] **CANVAS-05** Brand kit applied automatically: fonts, colors, logo placement · P0
- [ ] **CANVAS-06** Auto layout and responsive resize: one design to every format · P1
- [ ] **CANVAS-07** Components and variables: change the headline once, update 20 designs · P1
- [ ] **CANVAS-08** Data merge: generate 100 variants from a spreadsheet · P1
- [ ] **CANVAS-09** Export to PNG, JPG, SVG, PDF, and animated MP4/GIF · P0
- [ ] **CANVAS-10** Import from Figma (.fig), Canva, PSD, SVG, PDF · P2
- [ ] **CANVAS-11** Point and edit: click an element and tell the agent what to change · P1
- [ ] **CANVAS-12** Sketch to design: rough drawing becomes a finished layout · P2
- [ ] **CANVAS-13** Infinite whiteboard for moodboards, storyboards and campaign maps · P1
- [ ] **CANVAS-14** Comments and annotations on the canvas · P1
- [ ] **CANVAS-15** Layer separation: split a flat image into editable layers · P2
- [ ] **CANVAS-16** Presentation mode and slide decks from the canvas · P2
- [ ] **CANVAS-17** Print-ready export: CMYK, bleed, crop marks · P3

## 10. Video generation (VGEN)

- [~] **VGEN-01** Text-to-video and image-to-video through providers (Veo, Sora, Kling, Runway, Luma, Hailuo, Pika, Seedance, Wan) · P0
- [ ] **VGEN-02** Local open-weight video models through ComfyUI (Wan, Hunyuan, LTX) · P2
- [ ] **VGEN-03** Model router: pick the best model per shot by style, length, budget and speed · P1
- [ ] **VGEN-04** Shot list and storyboard from a script, then generate shot by shot · P0
- [ ] **VGEN-05** Character consistency across shots (reference images, character sheets) · P1
- [ ] **VGEN-06** Camera control: pans, zooms, dolly, orbit · P1
- [ ] **VGEN-07** First and last frame control, extend clip, loop · P1
- [ ] **VGEN-08** Video-to-video restyle · P2
- [ ] **VGEN-09** B-roll generation to cover gaps in talking-head footage · P1
- [ ] **VGEN-10** Product videos from product photos · P1
- [ ] **VGEN-11** UGC-style ad generation (with clear AI disclosure) · P2
- [ ] **VGEN-12** Generation cost and time estimates before running, with budget caps · P0
- [ ] **VGEN-13** Take management: keep several takes per shot and pick the best · P1

## 11. Video editing (VID)

- [ ] **VID-01** ffmpeg tool: probe, cut, trim, join, transcode, resize, crop, speed, reverse, extract audio, frames, GIFs · P0
- [ ] **VID-02** Timeline document format the agent edits (tracks, clips, transitions, text, audio, effects) · P0
- [ ] **VID-03** Renderer from the timeline file to MP4 (ffmpeg-based, or HTML/Revideo compositions) · P0
- [ ] **VID-04** Preview player panel with scrubbing, and instant re-render of changed parts · P0
- [ ] **VID-05** Timeline editor panel: multi-track, drag, trim, split, ripple delete (OpenCut-style) · P1
- [ ] **VID-06** Agent and human edit the same timeline live · P1
- [ ] **VID-07** Edit by transcript: delete words in the transcript and the video cut follows (Descript-style) · P0
- [ ] **VID-08** Silence and filler-word removal ("um", "uh", long pauses) · P0
- [ ] **VID-09** Long video to shorts: find the best moments, score virality, cut, reframe, caption · P0
- [ ] **VID-10** Auto reframe 16:9 to 9:16 and 1:1 with speaker and subject tracking · P0
- [ ] **VID-11** Multicam editing: switch angles to the active speaker · P2
- [ ] **VID-12** Jump cuts, zoom punch-ins and pattern interrupts for retention · P1
- [ ] **VID-13** B-roll insertion from the library, stock or generation, matched to what is being said · P1
- [ ] **VID-14** Text overlays, lower thirds, titles, end screens · P0
- [ ] **VID-15** Transitions and effects library · P1
- [ ] **VID-16** Color correction and LUTs, brand looks · P2
- [ ] **VID-17** Stabilization, denoise, upscale, frame interpolation · P2
- [ ] **VID-18** Green screen and background removal for video · P2
- [ ] **VID-19** Eye contact correction · P3
- [ ] **VID-20** Scene detection and shot logging of raw footage · P1
- [ ] **VID-21** Rough cut from raw footage plus a brief · P1
- [ ] **VID-22** Pacing analysis: retention risk points flagged on the timeline · P2
- [ ] **VID-23** Templates: talking head, listicle, tutorial, podcast clip, product demo, testimonial · P1
- [ ] **VID-24** Export presets per platform (resolution, bitrate, length limits, safe zones) · P0
- [ ] **VID-25** Project interchange: export to Premiere, DaVinci Resolve, Final Cut (XML/EDL/OTIO) · P2
- [ ] **VID-26** Screen recording capture and editing for tutorials · P2
- [ ] **VID-27** Cloud and GPU rendering for long or heavy renders · P2
- [ ] **VID-28** Video understanding: a multimodal model watches the footage and logs what happens, who speaks, emotions, on-screen text and visual highlights, with timestamps · P0
- [ ] **VID-29** Slot-based editing: the timeline can hold placeholder slots described in words ("aerial shot of a city at night, 3s"); the agent fills each slot through the sourcing ladder (SRC-01) · P0
- [ ] **VID-30** Script to video: a script becomes a timeline of narration, slots, captions and music, then every slot is filled · P0
- [ ] **VID-31** Edit in the style of a reference video: match its pacing, cut rhythm, caption style, zooms and music energy · P2
- [ ] **VID-32** Smart zooms and cursor follow for screen recordings · P2
- [ ] **VID-33** Highlight reels and recaps from many clips (events, weekly recap, testimonials montage) · P1
- [ ] **VID-34** Replace or regenerate any single shot without touching the rest of the edit · P1
- [ ] **VID-35** Hook builder for clips: rearrange so the most gripping moment plays first, add a text hook and a pattern interrupt · P0

## 12. Motion graphics and animation (MOTION)

- [ ] **MOTION-01** Motion graphics as code (HTML/CSS/JS, Revideo or Motion Canvas compositions) the agent writes · P0
- [ ] **MOTION-02** Animated text: kinetic typography, word-by-word reveals · P0
- [ ] **MOTION-03** Animated charts and data visualizations · P1
- [ ] **MOTION-04** Logo animations and intros/outros · P1
- [ ] **MOTION-05** Explainer animations from a script · P2
- [ ] **MOTION-06** Lottie export for apps and web · P2
- [ ] **MOTION-07** Animated carousels and slideshows from canvas designs · P1
- [ ] **MOTION-08** Image animation (parallax, Ken Burns, cinemagraphs) · P1
- [ ] **MOTION-09** 3D titles and simple 3D scenes · P3

## 13. Audio, voice and music (AUDIO)

- [~] **AUDIO-01** Realtime voice conversation with the agent (provider realtime APIs) · P1
- [ ] **AUDIO-02** Speech-to-text with word-level timestamps (Whisper/faster-whisper local, or API) · P0
- [ ] **AUDIO-03** Speaker diarization (who said what) · P0
- [ ] **AUDIO-04** Text-to-speech (local Kokoro/Chatterbox/Qwen3-TTS, or ElevenLabs/OpenAI/Cartesia APIs) · P0
- [ ] **AUDIO-05** Voice cloning with consent verification · P1
- [ ] **AUDIO-06** Pronunciation dictionary per brand (names, products, jargon) · P1
- [ ] **AUDIO-07** Emotion, pacing and emphasis control in TTS (SSML or tags) · P1
- [ ] **AUDIO-08** Multi-voice dialogue generation (two-host podcasts, conversations) · P1
- [ ] **AUDIO-09** Voice changer and speech-to-speech · P2
- [ ] **AUDIO-10** Overdub: fix a misspoken word in a recording with the cloned voice · P1
- [ ] **AUDIO-11** Audio cleanup: noise removal, de-reverb, de-ess, studio sound · P0
- [ ] **AUDIO-12** Loudness normalization per platform (LUFS targets) · P0
- [ ] **AUDIO-13** Music generation (licensed, royalty-free models or APIs) · P1
- [ ] **AUDIO-14** Music library search with licensing, and beat/mood matching · P1
- [ ] **AUDIO-15** Auto ducking: music lowers under speech · P0
- [ ] **AUDIO-16** Sound effects generation and library · P1
- [ ] **AUDIO-17** Stem separation (voice, music, drums) · P2
- [ ] **AUDIO-18** Beat detection and cut-to-beat editing · P1
- [ ] **AUDIO-19** Podcast production: multi-track recording import, leveling, intro/outro, chapters · P1
- [ ] **AUDIO-20** Audiograms: waveform videos for audio clips · P1
- [ ] **AUDIO-21** Audiobook production from text · P2
- [ ] **AUDIO-22** Dictation: speak to write drafts · P1

## 14. Avatars, dubbing and localization (AVATAR)

- [ ] **AVATAR-01** Talking-head avatars from a script (HeyGen, Synthesia, D-ID, Hedra APIs, or open models) · P2
- [ ] **AVATAR-02** Personal avatar of the creator, with consent records · P2
- [ ] **AVATAR-03** Lip-sync to new audio · P2
- [ ] **AVATAR-04** Video dubbing into other languages with the original voice · P1
- [ ] **AVATAR-05** Translation of all text content with brand glossary and locale rules · P1
- [ ] **AVATAR-06** Transcreation: adapt idioms, references and examples for each market, not literal translation · P1
- [ ] **AVATAR-07** Localized visuals: swap text in images and videos per language · P2
- [ ] **AVATAR-08** Right-to-left and CJK layout support in canvas and captions · P2

## 15. Captions and subtitles (CAP)

- [ ] **CAP-01** Auto captions from the transcript · P0
- [ ] **CAP-02** Styled animated captions (word highlight, pop, karaoke) with brand presets · P0
- [ ] **CAP-03** Emoji and keyword emphasis in captions · P1
- [ ] **CAP-04** SRT, VTT and ASS export; burned-in or sidecar · P0
- [ ] **CAP-05** Caption placement that avoids faces and platform UI safe zones · P1
- [ ] **CAP-06** Multi-language subtitles · P1
- [ ] **CAP-07** Caption correction pass using the brand glossary · P1

## 16. Repurposing (REP)

- [x] **REP-01** `/repurpose` one source into native pieces for other platforms · P0
- [x] **REP-02** Repurposing playbook skill · P0
- [ ] **REP-03** Pipelines as reusable recipes: "podcast episode to 1 article, 5 clips, 1 newsletter, 3 carousels" · P0
- [ ] **REP-04** Video to blog post with screenshots · P1
- [ ] **REP-05** Blog to video (script, voiceover, visuals, captions) · P1
- [ ] **REP-06** Webinar to clips, article, email recap and slides · P1
- [ ] **REP-07** Thread to carousel and carousel to video · P1
- [ ] **REP-08** Evergreen recycling: resurface top performers with new hooks on a schedule · P2
- [ ] **REP-09** Source links: every derivative links back to its source in the inventory · P1

## 17. Publishing and distribution (PUB)

- [ ] **PUB-01** Publish and schedule to social platforms (via Postiz MCP or direct APIs): X, LinkedIn, Instagram, Facebook, TikTok, YouTube, Threads, Bluesky, Pinterest, Reddit, Mastodon · P0
- [ ] **PUB-02** Publish to CMS: WordPress, Ghost, Webflow, Framer, Sanity, Contentful, Notion, Medium, Substack, Hashnode · P1
- [ ] **PUB-03** Newsletter platforms: Beehiiv, Kit, Mailchimp, Substack, Resend, Loops · P1
- [ ] **PUB-04** Podcast hosting: RSS, Spotify, Apple, Transistor, Buzzsprout · P2
- [ ] **PUB-05** Ad platforms: upload creatives and copy variants to Meta, Google, LinkedIn, TikTok ads · P2
- [ ] **PUB-06** Approval required before any publish, with a preview of exactly what goes out · P0
- [ ] **PUB-07** Best time to post from audience data · P2
- [ ] **PUB-08** First comment, tags, alt text, location, collaborators set per platform · P1
- [ ] **PUB-09** Cross-posting with per-platform adaptation, never identical posts · P1
- [ ] **PUB-10** Link tracking (UTM builder, short links) · P1
- [ ] **PUB-11** Queue management: calendar of scheduled posts, reschedule, pause all · P1
- [ ] **PUB-12** Published archive: final versions saved to `published/` with metadata · P0

## 18. Analytics and learning (ANL)

- [ ] **ANL-01** Pull performance metrics from every platform into the inventory · P1
- [ ] **ANL-02** Performance reports per brand, campaign, platform and format · P1
- [ ] **ANL-03** "What worked" analysis: which hooks, topics, formats and lengths win, and why · P1
- [ ] **ANL-04** Feedback loop: winning patterns become brand rules and playbook entries automatically · P2
- [ ] **ANL-05** A/B test management for headlines, thumbnails, hooks and creatives · P2
- [ ] **ANL-06** Video retention curve analysis tied to the timeline · P2
- [ ] **ANL-07** Client-ready reports (PDF or web) for agencies · P1
- [ ] **ANL-08** Web analytics and conversion attribution (GA4, Plausible, PostHog) · P2
- [ ] **ANL-09** Comment and sentiment analysis on published content · P2

## 19. SEO and AI search (SEO)

- [ ] **SEO-01** Keyword targeting and on-page optimization in drafts · P1
- [ ] **SEO-02** Search intent and SERP analysis before writing · P1
- [ ] **SEO-03** Content briefs from top-ranking pages (topics, questions, gaps) · P1
- [ ] **SEO-04** Internal linking suggestions across the content inventory · P1
- [ ] **SEO-05** Schema markup (Article, FAQ, HowTo, Video, Product) · P2
- [ ] **SEO-06** Content refresh: find decaying pages and update them · P2
- [ ] **SEO-07** AI search visibility (GEO): check and improve how ChatGPT, Perplexity, Gemini and Google AI Overviews cite the brand · P2
- [ ] **SEO-08** YouTube SEO: titles, descriptions, chapters, tags · P1
- [ ] **SEO-09** Programmatic SEO pages from data with quality guards · P3

## 20. Ads and performance creative (ADS)

- [ ] **ADS-01** Creative matrix: hooks × angles × formats × audiences generated in one go · P1
- [ ] **ADS-02** Ad library research (Meta Ad Library, TikTok Creative Center, Google Ads Transparency) · P1
- [ ] **ADS-03** Static ads, video ads, carousel ads from one brief · P1
- [ ] **ADS-04** Platform-specific specs and policy checks (Meta text rules, prohibited claims) · P1
- [ ] **ADS-05** Iteration from results: kill losers, generate variants of winners · P2
- [ ] **ADS-06** Landing page variants matched to ad angles · P2

## 21. Collaboration, review and approval (TEAM)

- [ ] **TEAM-01** Multi-user workspaces with roles: owner, editor, reviewer, client (view and approve) · P1
- [ ] **TEAM-02** Review links: share a draft, image or video for comments without an account · P0
- [ ] **TEAM-03** Frame-accurate video comments and pinned image comments · P1
- [ ] **TEAM-04** Approval workflows: draft, internal review, client review, approved, scheduled, published · P1
- [ ] **TEAM-05** Agent applies review comments automatically, with a summary of what changed · P1
- [ ] **TEAM-06** Assignments, due dates and notifications (Slack, email, Telegram) · P1
- [ ] **TEAM-07** Real-time co-editing of text, canvas and timeline · P2
- [ ] **TEAM-08** Activity log and audit trail · P1
- [ ] **TEAM-09** Shared playbooks, templates and prompts across the team · P1

## 22. Agency operations (AGENCY)

- [ ] **AGENCY-01** Client workspaces fully isolated (brands, assets, credentials, history) · P1
- [ ] **AGENCY-02** Client portal: approvals, calendar, reports, asset requests · P2
- [ ] **AGENCY-03** Per-client usage and cost tracking, and export for billing · P1
- [ ] **AGENCY-04** White-label: agency branding on portal, reports and review links · P2
- [ ] **AGENCY-05** Client onboarding flow (`/onboard` for a new client, intake forms) · P1
- [ ] **AGENCY-06** Deliverable tracking per retainer (posts per month, videos per month) · P2
- [ ] **AGENCY-07** Bulk operations across clients (holiday campaign for all clients) · P2

## 23. Automation (AUTO)

- [~] **AUTO-01** Scheduled automations (cron-style) · P1
- [ ] **AUTO-02** Recipes: weekly newsletter from the week's posts, daily trend digest, monthly report · P1
- [ ] **AUTO-03** Triggers: new YouTube upload, new podcast episode, new blog post, new product · P1
- [ ] **AUTO-04** Webhooks in and out, and n8n, Zapier and Make integration · P1
- [ ] **AUTO-05** Batch mode: run a pipeline over a spreadsheet of inputs · P1
- [ ] **AUTO-06** Headless CLI and CI mode for content pipelines · P1
- [ ] **AUTO-07** Engagement assistant: draft replies to comments and DMs for approval · P2

## 24. Models, providers and cost (MODEL)

- [~] **MODEL-01** Any text model through providers (OpenRouter, Anthropic, OpenAI, Google, local) · P0
- [ ] **MODEL-02** Media provider abstraction: one interface for image, video, TTS, STT, music and avatar providers · P0
- [ ] **MODEL-03** Bring your own keys, or a single managed account with credits · P1
- [ ] **MODEL-04** Fal, Replicate, Runpod and ComfyUI backends for open models · P1
- [ ] **MODEL-05** Local model manager: download, run and update local models (GPU detection) · P2
- [ ] **MODEL-06** Cost dashboard: spend per session, brand, client and model · P1
- [ ] **MODEL-07** Budgets and hard caps per workspace and per job · P0
- [ ] **MODEL-08** Caching of generations to avoid paying twice · P1
- [ ] **MODEL-09** Model comparison: run one prompt across models side by side · P2
- [ ] **MODEL-10** Fallbacks when a provider fails or rate-limits · P1
- [ ] **MODEL-11** Universal media model catalog: connect fal.ai, Replicate, Runware, WaveSpeed, Together, Hugging Face Inference and direct providers (Runway, Luma, Kling, Google, OpenAI, ElevenLabs, Black Forest Labs, Ideogram, Recraft, Meshy, Tripo) through one interface · P0
- [ ] **MODEL-12** Day-one models: read model schemas from the fal.ai and Replicate APIs so newly released models are usable without code changes · P0
- [ ] **MODEL-13** Model parameters as generated forms in the UI (from each model's schema), and as typed tool inputs for the agent · P1
- [ ] **MODEL-14** Async generation through queues and webhooks, with progress and resumable jobs · P0
- [ ] **MODEL-15** Model picker guidance: the agent knows each model's strengths (text rendering, realism, motion, speed, price) and explains its choice · P1
- [ ] **MODEL-16** Workflow chaining across models (generate image, upscale, animate, add voice, lip-sync) as one reusable pipeline · P1

## 25. Rights, safety and trust (TRUST)

- [ ] **TRUST-01** Content provenance: C2PA content credentials on generated media · P1
- [ ] **TRUST-02** AI disclosure labels where platforms or laws require them · P1
- [ ] **TRUST-03** Consent records for voice clones and likenesses; block cloning without consent · P0
- [ ] **TRUST-04** License tracking for every asset (stock, music, fonts, model output terms) · P1
- [ ] **TRUST-05** Copyright and trademark risk checks (logos, characters, lyrics, celebrity likeness) · P1
- [ ] **TRUST-06** Brand safety: block off-limits topics per brand · P1
- [ ] **TRUST-07** No impersonation of real people or organizations without authorization · P0
- [ ] **TRUST-08** Watermarking options for drafts and client previews · P2
- [ ] **TRUST-09** Data privacy: local-first by default, clear data flows to each provider, GDPR tools · P1
- [ ] **TRUST-10** Model license guard: block non-commercial models for commercial workspaces · P1

## 26. Interfaces (UI)

- [~] **UI-01** Terminal interface (TUI) · P0
- [~] **UI-02** Desktop app (Electron) with plugin panels · P0
- [~] **UI-03** Web app · P1
- [ ] **UI-04** Content-first home screen: brands, calendar, recent pieces, queue, not a code view · P0
- [ ] **UI-05** Rich previews: rendered post previews that look like each platform's feed · P0
- [ ] **UI-06** Media gallery panel for images, video and audio with compare view · P0
- [ ] **UI-07** Side-by-side document editor with agent suggestions inline · P1
- [ ] **UI-08** Mobile app: capture ideas, record voice notes, approve and publish · P2
- [ ] **UI-09** Browser extension: save to swipe file, research any page, draft replies in place · P2
- [ ] **UI-10** Voice mode: talk to the agent hands-free while filming or driving · P2
- [ ] **UI-11** Non-technical onboarding: no terminal, no config files required · P0
- [ ] **UI-12** Keyboard-first power-user mode · P1

## 27. Extensibility and ecosystem (EXT)

- [~] **EXT-01** Plugin system (agents, tools, commands, skills, hooks) · P0
- [~] **EXT-02** MCP client for external tools · P0
- [ ] **EXT-03** OpenContent as an MCP server, so other agents can use its brand, assets and pipelines · P2
- [ ] **EXT-04** Marketplace for playbooks, templates, brand kits, pipelines and plugins · P2
- [ ] **EXT-05** Template format that's shareable (one folder: prompts, canvas files, timeline files, assets) · P1
- [ ] **EXT-06** SDK and HTTP API for building on top · P1
- [ ] **EXT-07** Import playbooks and skills from other harnesses (Claude Code skills, Cursor rules) · P2

## 28. Built-in playbook library (TRICKS)

"Every trick in the book", shipped as editable skills and commands.

- [x] **TRICKS-01** Hook patterns (15) · P0
- [x] **TRICKS-02** Copywriting frameworks (AIDA, PAS, BAB, 4 Ps, PASTOR, QUEST and more) · P0
- [x] **TRICKS-03** Platform formats and limits · P0
- [x] **TRICKS-04** De-AI checklist · P0
- [x] **TRICKS-05** Repurposing playbook · P0
- [ ] **TRICKS-06** Storytelling structures: hero's journey, StoryBrand, before/after, in medias res, the "and, but, therefore" rule · P1
- [ ] **TRICKS-07** Short-form video retention playbook: hook in 1 second, open loops, pattern interrupts, payoff, loopable endings · P0
- [ ] **TRICKS-08** YouTube playbook: packaging (title and thumbnail first), retention, chapters · P1
- [ ] **TRICKS-09** Headline formulas and title libraries · P1
- [ ] **TRICKS-10** Persuasion and psychology: social proof, scarcity, reciprocity, anchoring, loss aversion (ethically) · P1
- [ ] **TRICKS-11** Viral format library: listicles, "I tried X for 30 days", reactions, myths, tier lists, day-in-the-life, before/after · P1
- [ ] **TRICKS-12** Thumbnail design rules · P1
- [ ] **TRICKS-13** Email deliverability and subject line playbook · P1
- [ ] **TRICKS-14** LinkedIn ghostwriting playbook for executives · P1
- [ ] **TRICKS-15** Personal brand building playbook · P1
- [ ] **TRICKS-16** Launch playbook (pre-launch, launch week, post-launch) · P1
- [ ] **TRICKS-17** Community and engagement playbook (reply strategy, DM scripts) · P2
- [ ] **TRICKS-18** UGC and creator brief templates · P2
- [ ] **TRICKS-19** Prompt-engineering playbooks per image and video model · P1
- [ ] **TRICKS-20** Content distribution checklist per piece · P1

## 29. Onboarding and learning (LEARN)

- [ ] **LEARN-01** Guided first run: set up a brand, make the first piece, publish it, in under 10 minutes · P0
- [ ] **LEARN-02** Example workspaces (solo creator, agency, SaaS marketing team) · P1
- [ ] **LEARN-03** In-app explanations of why the agent made a choice (which hook pattern, which framework) · P2
- [ ] **LEARN-04** Coaching mode: critique the user's own writing and teach the principle · P2

## 30. Platform, security and operations (OPS)

- [~] **OPS-01** Credential storage for providers and platforms · P0
- [ ] **OPS-02** OAuth connections for social platforms and CMSs · P0
- [x] **OPS-03** Isolated data folders, config, environment variables, service port, command name and desktop IDs, so OpenContentHarness never touches an OpenCode install · P0
- [ ] **OPS-04** Self-hosting (Docker) for agencies and teams · P1
- [ ] **OPS-05** Telemetry that's opt-in, and crash reporting · P1
- [ ] **OPS-06** Evaluations: test suite of briefs with expected quality, run on every prompt or model change · P1
- [ ] **OPS-07** Auto-update and release channels (self-update is switched off until we have our own releases; the desktop update feed still points at OpenCode and must change before packaging) · P1
- [x] **OPS-08** Independent from upstream: frozen on OpenCode v2.4.1, no syncing · P0

## 31. Media sourcing (SRC)

Footage, images, audio and 3D models pulled from your library, open sources and licensed stock, with the license recorded for every asset.

- [ ] **SRC-01** Sourcing ladder for every slot: own library first, then free and open sources, then licensed stock the user has connected, then AI generation. The user can set the order and the budget per project · P0
- [ ] **SRC-02** Free stock APIs: Pexels, Pixabay, Unsplash (images and video) · P0
- [ ] **SRC-03** Open-license collections: Openverse, Wikimedia Commons, Internet Archive, NASA, Smithsonian Open Access, The Met Open Access, Library of Congress, Europeana · P1
- [ ] **SRC-04** Open audio: Freesound, Free Music Archive, ccMixter, YouTube Audio Library-style catalogs · P1
- [ ] **SRC-05** GIFs and stickers: Giphy, Tenor · P2
- [ ] **SRC-06** Licensed stock connectors (user brings their own account): Shutterstock, Getty Images and iStock, Adobe Stock, Storyblocks, Pond5, Envato, Artgrid, Artlist, Epidemic Sound, Musicbed · P1
- [ ] **SRC-07** Open 3D model libraries: Sketchfab (downloadable CC models), Poly Haven (models, HDRIs, textures), Smithsonian 3D, NASA 3D · P2
- [ ] **SRC-08** Semantic matching: search every source by what the slot needs (subject, mood, motion, duration, orientation, color), and rank results by fit with a vision model · P0
- [ ] **SRC-09** Automatic license and attribution: store license, author, source URL and usage terms per asset; generate credits lines; block assets whose license doesn't allow the intended use (commercial, editorial only, no modifications) · P0
- [ ] **SRC-10** Quality filters: minimum resolution, frame rate, watermark detection, duration, aspect ratio · P0
- [ ] **SRC-11** Preview before download, and download only the selected segment for long clips · P1
- [ ] **SRC-12** Licensed stock purchase flow with approval and cost display · P2
- [ ] **SRC-13** Public web media (social posts, YouTube) only for reference and research by default; reuse only with the right license or permission, tracked per asset · P1

## 32. 3D (3D)

- [ ] **3D-01** 3D generation from text and images through fal.ai and direct providers (Trellis, Hunyuan3D, Meshy, Tripo, Rodin, and new models as they appear) · P1
- [ ] **3D-02** 3D viewer panel (three.js / model-viewer): orbit, zoom, lighting, materials, wireframe · P1
- [ ] **3D-03** 3D scene canvas: place products, text, logos and backgrounds; set camera, lights and environment (HDRI) · P2
- [ ] **3D-04** Scene file format the agent edits (glTF plus a JSON scene description) · P2
- [ ] **3D-05** Render 3D to images and video: turntables, camera moves, product reveals, exploded views · P1
- [ ] **3D-06** Product to 3D: turn product photos into a 3D model for unlimited angles and ad shots · P1
- [ ] **3D-07** 3D text and logo animations · P2
- [ ] **3D-08** Mockups on 3D objects (packaging, devices, apparel, billboards) with the user's design applied · P2
- [ ] **3D-09** Gaussian splats and captured scenes: view, frame and render fly-throughs · P3
- [ ] **3D-10** Export GLB, USDZ, OBJ, FBX; AR preview links for iOS and Android · P2
- [ ] **3D-11** Texture and material generation, retexturing an existing model · P2
- [ ] **3D-12** Rigging and simple animation of generated characters · P3

## 33. Email (EMAIL)

- [ ] **EMAIL-01** Email design files the agent edits (MJML or React Email), rendered to cross-client HTML with brand templates · P0
- [ ] **EMAIL-02** Inbox previews: desktop, mobile, dark mode, Gmail and Outlook rendering, plain-text version · P0
- [ ] **EMAIL-03** Sending through Resend, Amazon SES, Postmark, SendGrid, Mailgun, SMTP, or the user's Gmail and Outlook · P0
- [ ] **EMAIL-04** Contacts, lists, segments and tags; import from CSV or a CRM · P1
- [ ] **EMAIL-05** Personalization with merge fields and per-segment variants · P1
- [ ] **EMAIL-06** Sequences and drip campaigns with delays, conditions and exit rules · P1
- [ ] **EMAIL-07** Test sends to the user before every campaign, and approval required before sending to a list · P0
- [ ] **EMAIL-08** Deliverability checks: spam score, broken links, image-to-text ratio, SPF, DKIM and DMARC setup checks · P1
- [ ] **EMAIL-09** Compliance: unsubscribe links, physical address, consent tracking, CAN-SPAM and GDPR rules · P0
- [ ] **EMAIL-10** Opens, clicks, replies, bounces and unsubscribes fed back into analytics · P1
- [ ] **EMAIL-11** Subject line and content A/B tests with automatic winner selection · P2
- [ ] **EMAIL-12** Cold outreach and sales email with per-recipient research and daily send limits · P2
- [ ] **EMAIL-13** Reply handling: classify replies and draft responses for approval · P2
- [ ] **EMAIL-14** Transactional and product emails in brand voice · P2

## 34. Flagship pipelines (FLOW)

End-to-end chains that combine the features above. Each one is a single command and a reusable recipe.

- [ ] **FLOW-01** Long video to reels · P0
  1. Import a long video, podcast or livestream, or pull it from a URL (VID-01).
  2. Transcribe with word timings and speakers (AUDIO-02, AUDIO-03), and watch the footage (VID-28).
  3. Find the best self-contained moments and score them for hook, payoff, emotion and shareability (VID-09).
  4. Cut each clip, then tighten it: remove silences and filler words, and put the strongest line first (VID-08, VID-35).
  5. Reframe to 9:16 with speaker tracking (VID-10).
  6. Fill visual gaps with B-roll from the sourcing ladder or generation (VID-13, VID-29, SRC-01).
  7. Add animated brand captions, a text hook, zoom punch-ins, music with ducking, and an end card (CAP-02, VID-12, AUDIO-15).
  8. Write a caption, hashtags and a title for each platform (WRITE-01).
  9. Run checks: safe zones, loudness, length limits, captions (QA-13, QA-17).
  10. Show every clip for review, then schedule (PUB-01, PUB-06).
- [ ] **FLOW-02** Script or idea to finished video: script, voiceover or avatar, slot-filled timeline, captions, music, render (VID-30, AUDIO-04, SRC-01, VGEN-04) · P0
- [ ] **FLOW-03** Product photo to ad set: background removal, generated scenes, 3D model and turntable, animated video ads, copy variants, every aspect ratio (IMG-08, IMG-14, 3D-06, 3D-05, ADS-01) · P1
- [ ] **FLOW-04** Article to email campaign sent: newsletter version, designed email, test send, approval, send to segment, results in analytics (REP-01, EMAIL-01, EMAIL-07, EMAIL-03, EMAIL-10) · P1
- [ ] **FLOW-05** Podcast episode to full content package: clips, audiogram, article, show notes, newsletter, carousel, quote cards (REP-03) · P1
- [ ] **FLOW-06** Blog post to narrated video with B-roll, captions and thumbnail (REP-05) · P1
- [ ] **FLOW-07** Weekly autopilot: trend digest, idea shortlist, drafts for approval, scheduled posts, weekly report (AUTO-02, CORE-18) · P2
- [ ] **FLOW-08** Localize a campaign: translate, dub, swap on-image text, adapt for each market (AVATAR-04, AVATAR-06, AVATAR-07) · P2

---

## Proposed build order

1. **Foundation:** CORE-07, CORE-06, QA-04, QA-13 (OPS-03 and OPS-08 done). A rebranded, isolated harness whose text loop checks itself.
2. **First publish:** PUB-01, PUB-06, PUB-12, OPS-02. Content leaves the building.
3. **Media engine:** MODEL-02, MODEL-11, MODEL-12, MODEL-14, MODEL-07, VGEN-12. One interface to fal.ai, Replicate and direct providers for image, video, 3D, voice and music, with budgets.
4. **Long video to reels (FLOW-01):** VID-01, VID-28, AUDIO-02, AUDIO-03, VID-09, VID-08, VID-35, VID-10, CAP-01, CAP-02, CAP-04, AUDIO-11, AUDIO-12, AUDIO-15, VID-24, QA-17. The first flagship.
5. **Video editing with slot filling:** VID-02, VID-03, VID-04, VID-29, VID-13, SRC-01, SRC-02, SRC-08, SRC-09, SRC-10, VGEN-04, VGEN-09, MOTION-01, MOTION-02, VID-14. Then FLOW-02 (script to video), VID-05 and VID-06 (timeline panel, live co-editing), and SRC-06 (licensed stock).
6. **Email:** EMAIL-01, EMAIL-02, EMAIL-03, EMAIL-07, EMAIL-09, then FLOW-04.
7. **Images and canvas:** IMG-03, IMG-06, IMG-08, IMG-10, IMG-11, IMG-13, CANVAS-01, CANVAS-02, CANVAS-04, CANVAS-05, CANVAS-09.
8. **3D:** 3D-01, 3D-02, 3D-05, 3D-06, then FLOW-03 (product photo to ad set) and 3D-03 (3D scene canvas).
9. **Desktop experience:** UI-04, UI-05, UI-06, UI-11, LEARN-01. Usable without a terminal.
10. **Teams and agencies:** TEAM-02, TEAM-04, AGENCY-01, AGENCY-03, MODEL-06.
11. **Learning loop:** ANL-01, ANL-03, ANL-04, BRAND-04, BRAND-05, BRAND-12.
12. Everything else, by priority.

## Open decisions

- **Local models or APIs by default** for speech, images and video.
- **License:** keep MIT and connect to AGPL tools as separate services, or license OpenContent as AGPL.
- **Canvas base:** OpenPencil (MIT, agent-first, early), Penpot (MPL-2.0, mature, heavy) or Excalidraw (MIT, whiteboard only).
- **Video composition format:** HTML (OpenFilm-style), Revideo or Motion Canvas (MIT), or a JSON timeline rendered with ffmpeg.
- **Publishing:** Postiz as a separate service, or direct platform APIs.
