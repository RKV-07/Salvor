# Progress

## Current Status

| Area | Status | Evidence / Result | Next Action |
|---|---|---|---|
| JEV classifier | Proposed | Dedicated classifier selected as the proposed replacement for using an SLM as the routing classifier; no implementation or benchmark yet | Define JEV input features, output/action space, and training-label strategy |
| Intelligent Vector Cache | Proposed | Cache is being designed as an intelligent reuse layer rather than a similarity-only lookup; storage capacity is not currently treated as the primary constraint | Define cache metadata, retrieval signals, reuse policy, and evaluation criteria |

## Architecture Decision Log

### ADR-001 — Use JEV as the routing classifier

**Decision:** Proposed

**Reasoning:** JEV is being considered instead of using the SLM itself as the classifier because a dedicated classifier can potentially provide lower-cost and lower-latency routing, while allowing the routing policy to be trained specifically on observed routing outcomes rather than elicited through a generative model. This has not yet been demonstrated in this project.

**Evidence:** Not yet validated.

**Risks:**
- JEV inference cost — every request incurs routing cost before answer generation
- Classification errors — incorrect routing can either waste frontier-model budget or reduce response quality
- Additional latency — JEV sits on the critical path
- Training complexity — defining reliable routing labels may be difficult

**Validation required:** Compare JEV against simpler routing approaches, including a fixed rule-based router and an SLM-based router. Evaluation must include routing quality, end-to-end response quality, latency, and total inference cost including JEV.

---

### ADR-002 — Use an intelligent Vector Cache rather than similarity-only retrieval

**Decision:** Proposed

**Reasoning:** The Vector DB is being treated as an intelligent reuse layer rather than a basic semantic-similarity cache. A high embedding similarity does not necessarily mean that a stored response is suitable for reuse. The proposed cache may therefore incorporate additional signals such as response quality, historical reuse, freshness, confidence, model/version, cost, latency, and previous reuse outcomes.

Storage capacity is not currently considered the primary bottleneck. The architectural objective is to retain potentially useful prior computation when doing so can reduce unnecessary API calls and inference cost.

**Evidence:** Not yet validated.

**Risks:**
- Cache pollution — retaining low-quality or unsuitable responses can degrade reuse quality
- Stale responses — previously valid responses may become unsuitable over time
- Retrieval complexity — additional signals may increase retrieval and ranking latency
- False cache reuse — semantically similar queries may still require different answers
- Metadata quality — cache intelligence depends on reliable outcome and quality signals

**Validation required:** Compare similarity-only retrieval against the intelligent cache policy using cache hit rate, useful hit rate, response quality, false reuse rate, latency, and API cost.

---

### ADR-003 — Treat JEV and the Intelligent Vector Cache as the primary architectural research components

**Decision:** Proposed

**Reasoning:** Embeddings, vector databases, SLMs, and frontier models are existing technologies and do not need to be reinvented for this system. The proposed differentiation is instead concentrated in how the system decides when previous computation can be reused and how it decides which computational path a new query should take.

JEV provides the proposed routing intelligence, while the Intelligent Vector Cache provides the proposed reuse intelligence.

**Evidence:** Architectural hypothesis only.

**Risks:**
- The proposed components may not provide measurable improvement over simpler approaches
- Added complexity may outweigh any cost or quality benefits
- The combination may introduce additional latency that offsets API savings

**Validation required:** Establish controlled baselines and measure whether JEV and the Intelligent Vector Cache provide measurable improvements in cost, quality, latency, and useful cache reuse.
