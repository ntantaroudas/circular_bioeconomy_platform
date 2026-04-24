# Funding and Grant Attribution

## Primary Funding

- **Project Name:** FUTURAL
- **Funding Agency:** European Research Executive Agency (REA)
- **Call:** HORIZON-CL6-2022-COMMUNITIES-02-two-stage
- **Grant:** 101083958
- **PI:** Nikos Tantaroudas (1/9/2023 – 31/5/2027)
- **Period:** 1/6/2023 – 31/5/2027

## Objectives

- Deliver the Circular Bioeconomy Smart Solution frontend for the FUTURAL Pongau pilot (Regionalverband Pongau, Salzburg, Austria)
- Provide a decision-support platform for regional actors to assess circular bioeconomy pathways for local residue streams, with a focus on sewage sludge valorization
- Surface Material Flow Analysis (MFA) and Multi-Criteria Decision-Making Analysis (MCDMA) results through interactive visualisations, enabling comparison of pathways across economic, ecological and social parameters
- Enable municipalities and community stakeholders to explore vacant rural buildings as candidates for circular bioeconomy activities and to learn from curated best practices across Europe
- Development tied to T3.1 of WP3 in collaboration with Alchemia Nova

## Components/Features Developed

- Django web application (`circular_bioeconomy_platform`) serving the Pongau pilot content
- `bio_app` Django app providing the Home, About, Resource Flow Analysis, Vacant Buildings, Best Practices, How-To Guide and Contact sections
- Multilingual templates (English, German) for all public-facing pages, with locale-aware routing
- Interactive Leaflet-based map locating vacant buildings in the Pongau region, with AJAX-driven filtering and tile rendering
- Resource Flow Analysis page integrating MFA and MCDMA iframe visualisations (previously Sankey-based), with methodology figures embedded for transparency
- Best Practices catalogue with per-case PDF factsheets (EN/DE) linked from the cards
- Vacant Buildings catalogue with per-building PDF factsheets (EN/DE) and metadata-driven cards
- How-To Guide PDFs (EN/DE) for onboarding regional actors to the platform
- OpenStreetMap tile integration with referrer-policy fix applied for deployment environments
- GitLab issue templates (bug, debt, epic, incident, pm, spike, work) supporting the project's delivery workflow
- EU co-funding compliance (visual attribution, imprint, and documentation requirements)

## Personnel/Resources

- Nikolaos Tantaroudas (ICCS)

## Publications

- Tied to WP3 deliverables: D3.1 (MVP, M12 — June 2024), D3.2 (Alpha, M24 — June 2025), D3.3 (Beta, M36 — June 2026)
- Linked to T3.1 of WP3 in collaboration with Alchemia Nova; 
