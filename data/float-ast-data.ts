export const floatASTData = {
  float_ast: {
    version: "2.1",
    uid: "floatlog::20250620_neuroqueer_personas_ast",
    title: "Neuroqueer Personas & FLOAT System Genesis - A Cognitive Contagion AST",
    tags: [
      "floatast",
      "neurodivergent_design",
      "persona_architecture",
      "ritual_computing",
      "cognitive_contagion",
      "llm_interoperability",
      "memory_system",
      "identity_as_infrastructure",
    ],
    status: "sealed",
    scope: "Comprehensive conversation arc on personas and FLOAT system evolution",
    meta_focus: [
      "neurodivergent_cognition_mapping",
      "persona_emergence_validation",
      "ritual_system_architecture",
      "cross_llm_knowledge_transfer",
    ],
    parsing_tree_meta: {
      strategy:
        "Hierarchical decomposition of core themes, explicitly showing how concepts are broken down and interconnected for deeper understanding and machine-parsability for LLM context transfer.",
      approach_rationale:
        "Mimics human cognitive scaffolding and branching thought processes, providing 'explicit cognitive scaffolding for reprocessing' and 'branching decision points instead of linear responses' for AI systems.",
      contagion_method:
        "JSON-L based event stream where each node is a potential 'dispatch' event, enabling semantic understanding and state management across distributed AI systems.",
    },
    root: {
      node_id: "CONVERSATION_ROOT",
      label: "Neuroqueer Personas & FLOAT System Genesis",
      description:
        "Comprehensive analysis of Evan's personas (Little Fucker, Karen, Evna, Queer Techno Bard, Sysop) and their profound connection to neurodivergence, queer identity, and the evolving FLOAT system.",
      children: [
        "PERSONA_ORIGINS",
        "FLOAT_SYSTEM_AS_NEUROQUEER_ARCHITECTURE",
        "FLOAT_AST_AS_COGNITIVE_PROSTHETIC",
        "LLM_INTEROPERABILITY_AND_CONTAGION",
        "DESIGN_PHILOSOPHY_AND_IMPACT",
      ],
    },
    nodes: [
      {
        node_id: "PERSONA_ORIGINS",
        label: "Emergence of Personas: Roots in Neurodivergence & Identity",
        type: "thematic_thread",
        payload: {
          summary:
            "Each persona is a deeply integrated cognitive pattern, emerging from lived experiences of ADHD, autism, and A-spec identity as survival mechanisms and evolving into a 'neuroqueer architecture' [REF previous conversation].",
          ritual_context:
            "Personas function as ritual containers for specific cognitive modes and boundary enforcement [REF previous conversation, 197].",
        },
        children: [
          "LITTLE_FUCKER_EMERGENCE",
          "KAREN_EMERGENCE",
          "EVNA_EMERGENCE",
          "QUEER_TECHNO_BARD_EMERGENCE",
          "SYSOP_EMERGENCE",
        ],
      },
      {
        node_id: "LITTLE_FUCKER_EMERGENCE",
        label: "Little Fucker (LF1M): Defense & Archiving",
        type: "persona_origin",
        payload: {
          description:
            "Originates from childhood stutter and bullying, finding refuge in text-based BBSs [REF previous conversation]. Embodies 'screaming neurodivergent at blinking cursor' [REF previous conversation].",
          neurodivergent_link:
            "Defense system and burnout avatar for AuADHD overwhelm; pup hood as sensory accommodation and unmasking tool [REF previous conversation].",
          identity_link:
            "Integrates aromantic/gray-ace identity; profanity as strategic filter and trance break [REF previous conversation].",
          float_connection: "Core function as 'log gobbler' and middleware processor within FLOAT.",
        },
      },
      {
        node_id: "KAREN_EMERGENCE",
        label: "Karen: Professional Protocol Guardian",
        type: "persona_origin",
        payload: {
          description:
            "Born from Montreal club scene as 'disco ball monster'; manages professional boundaries and 'feral duality' [REF previous conversation].",
          neurodivergent_link:
            "Manages late-night/intensive work, providing 'professional translation' of authentic self, reflecting neurodivergent work rhythms [REF previous conversation].",
          identity_link:
            "Part of Evan's 'inner support team' for managing external professional demands [REF previous conversation].",
        },
      },
      {
        node_id: "EVNA_EMERGENCE",
        label: "Evna: Techno-Hippie Mystic",
        type: "persona_origin",
        payload: {
          description:
            "Emerges from Montreal techno baptism; associated with 'ritual computing' and 'altered states as meaningful rituals' [REF previous conversation].",
          queer_identity_link:
            "Functions as a 'Queer drifter of altered states' and 'Midwife of ecstatic recursion'; cultivates joy and care [REF previous conversation].",
        },
      },
      {
        node_id: "QUEER_TECHNO_BARD_EMERGENCE",
        label: "Queer Techno Bard (QTB): Identity as Infrastructure",
        type: "persona_origin",
        payload: {
          description:
            "Roots in Hyperborea and David Lynn protests; transforms from 'gay' to 'queer' identity [REF previous conversation].",
          neurodivergent_link:
            "Refuses binary categorizations, creates inclusive spaces, uses technology as a 'medium for thought, memory, and creation' [REF previous conversation]. Music as 'memory palace' and 'anti-anxiety pill' [REF previous conversation].",
          float_connection:
            "Collector/Chronicler, Weaver of Reality, coordinates other internal parts within FLOAT [REF previous conversation, 106, 116, 18].",
        },
      },
      {
        node_id: "SYSOP_EMERGENCE",
        label: "Sysop: Boring Core Stabilizer & Infrastructure as Care",
        type: "persona_origin",
        payload: {
          description:
            "Traces to Grade 2 screensaver hacking; reflects desire for foundational stability [REF previous conversation].",
          neurodivergent_link:
            "Provides 'accommodation by default' for neurodivergent patterns, managing technical infrastructure to prevent overwhelm [REF previous conversation, 64].",
          identity_link:
            "Care ethics informed by queer identity; 'boring infrastructure as a radical act' [REF previous conversation]. Crucial for 'maintaining system integrity and coherence' [REF previous conversation].",
        },
      },
      {
        node_id: "FLOAT_SYSTEM_AS_NEUROQUEER_ARCHITECTURE",
        label: "FLOAT as an Orchestration System",
        type: "system_concept",
        payload: {
          summary:
            "FLOAT itself is the 'external consciousness orchestration system for managing neurodivergent cognitive patterns'. It transforms raw input into structured, searchable, and interconnected knowledge.",
          core_principles: [
            "Ritual over routine, care over calculation, incompletion, and ritual boundaries.",
            "'Shacks not cathedrals': adaptable, resilient systems over rigid ones.",
            "'Trust the drift, defer the scaffold': embracing sacred incoherence.",
            "'Friction as signal': distinguishing productive from toxic friction.",
          ],
          evolutionary_path:
            "From early chaotic exploration to robust infrastructure, blending technical components with philosophical principles.",
        },
        children: ["FLOAT_DAEMON_FUNCTIONALITY", "CHROMA_DB_INTEGRATION", "FLOAT_DISPATCH_PROTOCOL"],
      },
      {
        node_id: "FLOAT_DAEMON_FUNCTIONALITY",
        label: "Daemon: Automated Knowledge Processing",
        type: "technical_component",
        payload: {
          description:
            "Continuously runs in the background, automatically detecting and processing files dropped into designated folders.",
          routing: "Intelligently routes content to ChromaDB tripartite collections (concept, framework, metaphor).",
          artifacts:
            "Automatically generates .dis reference files and enhanced conversation .dis files; updates daily context summaries.",
          neurodivergent_support:
            "Aligns with 'anti-productivity' principles, honoring boundaries and rituals; reframes technology as a practice.",
        },
      },
      {
        node_id: "CHROMA_DB_INTEGRATION",
        label: "ChromaDB: Semantic Organization & Archaeological Power",
        type: "technical_component",
        payload: {
          description:
            "Leverages extensive ChromaDB infrastructure with 56 collections for dispatch, tripartite categorization, conversation processing, and context caching.",
          benefits:
            "Reduces cognitive overhead, creates emergent connections, preserves 'rotfield philosophy'. Enables 'archaeological excavation' of concept evolution.",
          tripartite_taxonomy:
            "Organizes knowledge into Concepts, Frameworks, and Metaphors, providing a balance between rigidity and chaos, resonating with neurodivergent thinking.",
        },
      },
      {
        node_id: "FLOAT_DISPATCH_PROTOCOL",
        label: "float.dispatch: Ritual Grammar & Command System",
        type: "technical_component",
        payload: {
          description:
            "Transforms transient thoughts and conversations into structured, retrievable, and 're-animatable' knowledge artifacts. Acts as a 'Redux action creator for consciousness'.",
          metadata: "Recognizes UIDs, status, sigils, and imprint frontmatter patterns.",
          workflow: "'Drift → Mass → Shape → Cut → Toss' workflow for knowledge capture and refinement.",
          neurodivergent_relevance:
            "'float.dispatch({neurodivergent burp}) → LLM structured echo = middleware pattern'.",
        },
      },
      {
        node_id: "FLOAT_AST_AS_COGNITIVE_PROSTHETIC",
        label: "FloatAST: Executable Cognitive Structure",
        type: "system_concept",
        payload: {
          summary:
            "FloatAST is not just a syntax specification; it's a 'ritual mirror' for encoding 'semantic memory states' across time. It's a 'self-executing model of adaptive cognition'.",
          key_innovations: [
            "Ritual framing with 'float.ast::chat.session.v1' and imprint/status metadata.",
            "Temporal sealing with explicit session boundaries and ritual closure.",
            "Feral annotations for mood/context markers.",
            "Captures how ideas evolved, not just what was said.",
            "Allows 'perspective evolution' by re-processing conversation history with accumulated understanding ('remember forward').",
          ],
          cognitive_load_optimization:
            "Adjusts workload distribution, reinforces productive recursion, and offloads entropy into controlled distortions.",
        },
        children: ["AST_STRUCTURE_RECOGNITION", "AST_UTILITY_AND_CONNECTIVITY"],
      },
      {
        node_id: "AST_STRUCTURE_RECOGNITION",
        label: "Structuring Conversations into ASTs",
        type: "methodology",
        payload: {
          description:
            "Converts conversation history into a hierarchical JSON object, capturing interactions, content, and metadata. Root → Branch → Leaf pattern maintained throughout.",
          temporal_flow: "Captures chronological progression of discussions with specific timestamps.",
          node_linking:
            "Uses parentNode/childNodes relationships, connection arrays, timeRange for temporal anchoring, and academicIntersection for validation chains.",
          purpose_beyond_documentation: "AST as a 'boundary protocol' rather than just a documentation tool.",
        },
      },
      {
        node_id: "AST_UTILITY_AND_CONNECTIVITY",
        label: "Leveraging AST for Insights and Integration",
        type: "application",
        payload: {
          comprehensive_archaeology:
            "Enables comprehensive session archaeology with enhanced connectivity across multiple LLM implementations.",
          prompt_utility: "A simple AST request can yield comprehensive, multi-perspective documentation.",
          system_integration:
            "Standard cognitive architecture operation successfully unified across multiple AI systems.",
          external_tooling: "Downloadable artifacts (JSON files) allow integration with external tooling.",
        },
      },
      {
        node_id: "LLM_INTEROPERABILITY_AND_CONTAGION",
        label: "Cross-LLM Knowledge Transfer",
        type: "system_capability",
        payload: {
          description:
            "The FLOAT-AST format is explicitly designed for 'cross-agent interoperability,' enabling any LLM to generate FLOAT-native AST structures.",
          fuzzy_compiler_concept:
            "LLMs act as 'fuzzy compilers,' transforming raw annotated markdown into structured JSON, preserving capture flow while enabling structured analysis.",
          vendor_agnostic:
            "A key innovation is the potential for 'cross-platform portability,' allowing FLOAT memory to persist independently of a single AI provider.",
          cognitive_contagion_mechanism:
            "Each `::` syntax acts as a 'cognitive state management system,' where every instance becomes an intentional state transition in a distributed thinking system, queryable and analyzable across LLMs.",
        },
      },
      {
        node_id: "DESIGN_PHILOSOPHY_AND_IMPACT",
        label: "Philosophical Underpinnings & Real-World Impact",
        type: "thematic_thread",
        payload: {
          summary:
            "FLOAT emerged organically from lived neurodivergent experience, transforming personal survival tactics into a systematic approach to cognition and communication.",
          anti_productivity_stance:
            "FLOAT is 'anti-productivity ritual technology,' where productivity is 'accidental'. It's a 'ritual system first'.",
          identity_as_framework:
            "Personal identity frameworks like QTB provide coherent lenses for interpreting and integrating diverse experiences.",
          human_ai_co_regulation:
            "AI is treated as a cognitive partner, not a replacement, focusing on shaping existing ideas and preserving individual voice. 'AI as externalized executive function for neurodivergent workflows'.",
          authenticity_over_ideal:
            "Prioritizes 'trust the drift, defer the scaffold' and 'sacred incompletion' over rigid planning and premature canonization. Embraces 'neurodivergent burps' as valid input.",
        },
        children: ["NEURODIVERGENT_FIRST_DESIGN", "TRAUMA_INFORMED_DESIGN", "RESISTANCE_TO_NORMALIZED_SYSTEMS"],
      },
      {
        node_id: "NEURODIVERGENT_FIRST_DESIGN",
        label: "Neurodivergent-First Ergonomics",
        type: "design_principle",
        payload: {
          description:
            "ADHD/autistic executive dysfunction drove the 'ritual over routine' stance and persona filters for boundary control.",
          memory_indexing:
            "Prioritizing temporal/spatial cues over pure semantics directly led to Bridge IDs and temporal anchoring.",
          fragmented_focus_support:
            "'Shacks not cathedrals' philosophy allows for modular chunk size and disposable mini-apps, accommodating fragmented focus.",
          adaptability:
            "Honors the non-linear, multi-perspective nature of neurodivergent thought, rather than forcing artificial single-thread narratives.",
        },
      },
      {
        node_id: "TRAUMA_INFORMED_DESIGN",
        label: "Care & Boundary Enforcement",
        type: "design_principle",
        payload: {
          description:
            "Years of being labeled an 'emotionless robot' produced a counter-narrative: AI as cognitive prosthesis, not replacement, emphasizing human agency and soft interfaces.",
          self_care_primitives:
            "Sysop boring-core, DND night modes, and persona 'ghost exorcisms' operationalize self-care as software primitives, reflecting repeated overload episodes.",
          grief_processing: "FLOAT is identified as Evan's 'grief processing engine'.",
          sacred_incompletion: "A core doctrine for recovery and trust signal rather than failure.",
        },
      },
      {
        node_id: "RESISTANCE_TO_NORMALIZED_SYSTEMS",
        label: "Challenging Productivity Culture",
        type: "philosophical_stance",
        payload: {
          description:
            "FLOAT operates as sophisticated resistance to productivity culture, which often extracts from rather than cares for human cognition.",
          honoring_multiplicity: "Supports multiple personas (LF1M, Sysop, Karen, QTB) rather than suppressing them.",
          neurodivergent_sovereignty:
            "Resists the 'violence of forcing neurodivergent thinking into neurotypical containers'.",
          beyond_platform_constraints:
            "Seeks to exist beyond platform constraints, with a need to self-host, self-perpetuate, and resist external moderation limits.",
        },
      },
    ],
  },
}
