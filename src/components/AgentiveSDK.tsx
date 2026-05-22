import React, { useRef, useEffect } from 'react';

// ─── Section Groups ────────────────────────────────────────────────────────────

export const SDK_GROUPS = [
  { id: 'getting-started', label: 'Getting Started',   ids: ['overview', 'manifest', 'layer-model'] },
  { id: 'core-concepts',   label: 'Core Concepts',      ids: ['state', 'orchestrator', 'routing', 'guards'] },
  { id: 'specialists',     label: 'Specialists',         ids: ['patterns', 'registration', 'specialist-result'] },
  { id: 'tools',           label: 'Tools',               ids: ['sub-agent-tools', 'internal-tools', 'composio-tools'] },
  { id: 'workflows',       label: 'Workflows',           ids: ['workflow-definitions', 'approval-gates'] },
  { id: 'context',         label: 'Context',             ids: ['context-system', 'context-guard'] },
  { id: 'infrastructure',  label: 'Infrastructure',      ids: ['persistence', 'streaming', 'entrypoints'] },
  { id: 'configuration',   label: 'Configuration',       ids: ['model-config', 'environment', 'persona'] },
  { id: 'extension',       label: 'Extension & Profiles',ids: ['extension-points', 'domain-profiles'] },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

const SectionHeading = ({ id, title, subtitle }: { id: string; title: string; subtitle?: string }) => (
  <div id={id} style={{ marginBottom: '2rem', paddingTop: '0.25rem' }}>
    <h2 style={{
      fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-heading)',
      margin: 0, marginBottom: subtitle ? '0.5rem' : 0,
      fontFamily: 'var(--font-family)',
      borderBottom: '1px solid var(--color-border-primary)',
      paddingBottom: '0.75rem',
    }}>{title}</h2>
    {subtitle && (
      <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.925rem', lineHeight: 1.6 }}>{subtitle}</p>
    )}
  </div>
);

const SubHeading = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{
    fontSize: '1.05rem', fontWeight: 650, color: 'var(--color-text-heading)',
    margin: '2rem 0 0.75rem', fontFamily: 'var(--font-family)',
  }}>{children}</h3>
);

const Pill = ({ children, color }: { children: React.ReactNode; color?: string }) => {
  const isPurple = color === 'purple' || color === 'blue';
  const isOrange = color === 'green';
  const bg = isPurple ? 'var(--brand-secondary-25)' : isOrange ? 'var(--brand-primary-25)' : 'var(--neutral-100)';
  const fg = isPurple ? 'var(--brand-secondary-500)' : isOrange ? 'var(--brand-primary-500)' : 'var(--color-text-body)';
  const bd = isPurple ? 'var(--brand-secondary-400)' : isOrange ? 'var(--brand-primary-400)' : 'var(--color-border-primary)';
  return (
    <span style={{
      display: 'inline-block', padding: '2px 8px', borderRadius: 'var(--m3-shape-full)',
      fontSize: '0.72rem', fontWeight: 600, fontFamily: 'var(--font-family)',
      background: bg, color: fg, border: `1px solid ${bd}`,
    }}>{children}</span>
  );
};

const Code = ({ children }: { children: React.ReactNode }) => (
  <code style={{
    fontFamily: 'monospace', fontSize: '0.82rem',
    background: 'var(--neutral-100)', color: 'var(--brand-secondary-500)',
    padding: '1px 5px', borderRadius: 'var(--m3-shape-extra-small)',
    border: '1px solid var(--color-border-primary)',
  }}>{children}</code>
);

const CodeBlock = ({ code, lang = 'typescript' }: { code: string; lang?: string }) => (
  <div style={{
    background: 'var(--brand-neutral-900)', borderRadius: 'var(--m3-shape-medium)', overflow: 'hidden',
    marginBottom: '1.5rem', border: '1px solid var(--brand-neutral-700)',
  }}>
    <div style={{
      padding: '8px 14px', background: 'var(--brand-neutral-800)',
      borderBottom: '1px solid var(--brand-neutral-700)',
      fontSize: '0.7rem', fontFamily: 'monospace', color: 'var(--brand-neutral-400)', letterSpacing: '0.05em',
    }}>{lang}</div>
    <pre style={{
      margin: 0, padding: '1rem 1.25rem', overflowX: 'auto',
      fontSize: '0.8rem', lineHeight: 1.7, fontFamily: 'monospace', color: 'var(--brand-neutral-100)',
    }}>{code}</pre>
  </div>
);

const FieldTable = ({ rows }: { rows: { field: string; type: string; desc: string; required?: boolean }[] }) => (
  <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid var(--color-border-primary)' }}>
          {['Field', 'Type', 'Description'].map(h => (
            <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600, color: 'var(--color-text-heading)', whiteSpace: 'nowrap' }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} style={{ borderBottom: '1px solid var(--color-border-primary)', background: i % 2 === 0 ? 'transparent' : 'var(--neutral-50)' }}>
            <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--brand-secondary-500)', whiteSpace: 'nowrap' }}>
              {r.field}{r.required && <span style={{ color: 'var(--brand-primary-500)', marginLeft: 3 }}>*</span>}
            </td>
            <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '0.76rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>{r.type}</td>
            <td style={{ padding: '8px 12px', color: 'var(--color-text-body)', lineHeight: 1.5 }}>{r.desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const InfoCard = ({ children, accent }: { children: React.ReactNode; accent?: string }) => (
  <div style={{
    background: accent === 'purple' ? 'var(--brand-secondary-25)' : 'var(--neutral-50)',
    border: `1px solid ${accent === 'purple' ? 'var(--brand-secondary-400)' : 'var(--color-border-primary)'}`,
    borderLeft: `3px solid ${accent === 'purple' ? 'var(--brand-secondary-500)' : 'var(--neutral-300)'}`,
    borderRadius: '8px', padding: '1rem 1.25rem', marginBottom: '1.5rem',
    fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--color-text-body)',
  }}>{children}</div>
);

const TwoCol = ({ left, right }: { left: React.ReactNode; right: React.ReactNode }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
    <div>{left}</div>
    <div>{right}</div>
  </div>
);

const PatternCard = ({ title, badge, desc, impl }: { title: string; badge: string; desc: string; impl: string }) => (
  <div style={{
    border: '1px solid var(--color-border-primary)', borderRadius: '10px',
    padding: '1.1rem 1.25rem', background: 'var(--neutral-50)', marginBottom: '1rem',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
      <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text-heading)' }}>{title}</span>
      <Pill color="purple">{badge}</Pill>
    </div>
    <p style={{ margin: '0 0 0.4rem', fontSize: '0.85rem', color: 'var(--color-text-body)', lineHeight: 1.5 }}>{desc}</p>
    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>{impl}</p>
  </div>
);

// ─── Section Components ────────────────────────────────────────────────────────

const SectionOverview = () => (
  <section>
    <SectionHeading id="overview" title="Agentive SDK" subtitle="A generic Agent Development and Deployment SDK for building, configuring, and running multi-specialist AI agents. Opinionated on runtime (LangGraph + LLM); fully pluggable on domain, tools, integrations, and persistence." />

    <SubHeading>Design Principles</SubHeading>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.875rem', marginBottom: '2rem' }}>
      {[
        { icon: '⚙️', title: 'Fixed Runtime', desc: 'LangGraph StateGraph + LLM provider. Agencies choose the model, not the graph engine.' },
        { icon: '🧠', title: 'Orchestrator → Specialist', desc: 'Always the execution model. Agencies define which specialists exist.' },
        { icon: '🔌', title: 'Pluggable Tools', desc: 'Bring Composio toolkits, native functions, or sub-agent tools.' },
        { icon: '🗄️', title: 'Interface-Driven Persistence', desc: 'Swap SQLite, Postgres, or any store by implementing the interface.' },
        { icon: '💉', title: 'Injected Domain Knowledge', desc: 'Context bundles are schema-driven and loaded at runtime.' },
        { icon: '📋', title: 'Two-Layer Design', desc: 'Developers implement logic in code; admins wire everything via JSON manifest.' },
      ].map(p => (
        <div key={p.title} style={{ border: '1px solid var(--color-border-primary)', borderRadius: '10px', padding: '1rem 1.25rem', background: 'var(--neutral-50)' }}>
          <div style={{ fontSize: '1.25rem', marginBottom: '0.4rem' }}>{p.icon}</div>
          <div style={{ fontWeight: 650, fontSize: '0.875rem', color: 'var(--color-text-heading)', marginBottom: '0.3rem' }}>{p.title}</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{p.desc}</div>
        </div>
      ))}
    </div>

    <SubHeading>Runtime Dependencies</SubHeading>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
      <div>
        <div style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Required</div>
        {['@langchain/langgraph', '@langchain/core', 'LLM provider (e.g. @langchain/google-genai)'].map(d => (
          <div key={d} style={{ fontFamily: 'monospace', fontSize: '0.8rem', padding: '4px 0', color: 'var(--color-text-body)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: 'var(--brand-primary-500)' }}>●</span> {d}
          </div>
        ))}
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Optional</div>
        {['composio-core', '@langchain/langgraph-checkpoint-sqlite', 'firebase-admin'].map(d => (
          <div key={d} style={{ fontFamily: 'monospace', fontSize: '0.8rem', padding: '4px 0', color: 'var(--color-text-body)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: 'var(--neutral-400)' }}>○</span> {d}
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SectionManifest = () => (
  <section>
    <SectionHeading id="manifest" title="Agent Manifest" subtitle="The top-level configuration file (agent-manifest.json) authored by an agency admin to define a complete agent. Loaded at boot time by the SDK runtime." />

    <InfoCard accent="purple">
      <strong>Entry point:</strong> <Code>AgentRuntime.boot(manifestPath: string)</Code> — loads the manifest, builds the LangGraph, and initialises all stores and tooling.
    </InfoCard>

    <FieldTable rows={[
      { field: 'id',          type: 'string',   required: true,  desc: 'Unique agent identifier used as prefix in thread IDs. e.g. "aria", "max", "scout"' },
      { field: 'name',        type: 'string',   required: true,  desc: 'Human-facing display name' },
      { field: 'version',     type: 'string',   required: true,  desc: 'Semver string. Namespaces checkpoints so state migrations don\'t corrupt prior threads.' },
      { field: 'description', type: 'string',   required: true,  desc: 'One sentence describing the agent\'s purpose' },
      { field: 'model',       type: 'ModelConfig', required: true, desc: 'LLM model config. Provider is pluggable.' },
      { field: 'persona',     type: 'Persona',  required: true,  desc: 'Agent character, behavioral mandates, and output style' },
      { field: 'specialists', type: 'SpecialistRegistration[]', required: true, desc: 'Specialist nodes the agent can route to' },
      { field: 'tools',       type: 'ToolsConfig', desc: 'Internal function tools and Composio toolkits' },
      { field: 'context',     type: 'ContextConfig', desc: 'Entity context loading configuration' },
      { field: 'workflows',   type: 'WorkflowDefinition[]', desc: 'Ordered multi-step workflows' },
      { field: 'guards',      type: 'GuardsConfig', desc: 'Circuit breakers, approval patterns, and sanitization' },
      { field: 'persistence', type: 'PersistenceConfig', desc: 'Checkpoint and thread store configuration' },
      { field: 'routing',     type: 'RoutingConfig', desc: 'Tool priority ordering' },
    ]} />

    <CodeBlock lang="agent-manifest.json" code={`{
  "id": "aria",
  "name": "Aria",
  "version": "1.0.0",
  "description": "AI marketing strategist and media buying orchestrator",
  "model": {
    "provider": "google-genai",
    "modelId": "gemini-2.0-flash",
    "temperature": 0.7,
    "maxOutputTokens": 16384,
    "apiKeyEnvVar": "GOOGLE_API_KEY"
  },
  "persona": { ... },
  "specialists": [ ... ],
  "tools": { "internalTools": [...], "composioToolkits": [...] },
  "workflows": [ ... ],
  "guards": { ... },
  "persistence": { ... },
  "routing": { "toolPriority": [...] }
}`} />
  </section>
);

const SectionLayerModel = () => (
  <section>
    <SectionHeading id="layer-model" title="Two-Layer Model" subtitle="The SDK separates developer code from admin configuration into two distinct layers." />

    <TwoCol
      left={
        <div style={{ border: '1px solid var(--color-border-primary)', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ background: 'var(--brand-secondary-500)', padding: '0.75rem 1rem', color: 'var(--brand-neutral-25)', fontWeight: 700, fontSize: '0.875rem' }}>Developer Layer</div>
          <div style={{ padding: '1rem 1.25rem', background: 'var(--neutral-50)' }}>
            <p style={{ margin: '0 0 0.75rem', fontSize: '0.85rem', color: 'var(--color-text-body)', lineHeight: 1.5 }}>TypeScript/JS interfaces. Implement specialist logic, tools, and persistence backends in code.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {['ISpecialistNode', 'IInternalTool', 'IContextLoader', 'IEntityStore', 'IThreadStore'].map(i => <Pill key={i}>{i}</Pill>)}
            </div>
          </div>
        </div>
      }
      right={
        <div style={{ border: '1px solid var(--color-border-primary)', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ background: 'var(--brand-neutral-900)', padding: '0.75rem 1rem', color: 'var(--brand-neutral-25)', fontWeight: 700, fontSize: '0.875rem' }}>Admin Config Layer</div>
          <div style={{ padding: '1rem 1.25rem', background: 'var(--neutral-50)' }}>
            <p style={{ margin: '0 0 0.75rem', fontSize: '0.85rem', color: 'var(--color-text-body)', lineHeight: 1.5 }}>agent-manifest.json. Declare agent identity, register specialists, define workflows, configure guards — no code required.</p>
            <Pill>agent-manifest.json</Pill>
          </div>
        </div>
      }
    />
  </section>
);

const SectionState = () => (
  <section>
    <SectionHeading id="state" title="State" subtitle="The LangGraph Annotation.Root state machine. Comprises built-in SDK fields and agency-defined custom fields compiled at boot time." />

    <InfoCard>
      State is compiled at boot by merging <Code>builtinFields</Code> + <Code>manifest.state.customFields</Code> into a single <Code>Annotation.Root</Code> definition. Built-in fields cannot be renamed or removed.
    </InfoCard>

    <SubHeading>Built-in Fields</SubHeading>
    <FieldTable rows={[
      { field: 'messages',              type: 'BaseMessage[]',              desc: 'Full conversation history. Reducer: concat.' },
      { field: 'agentId',               type: 'string',                     desc: 'ID of the agent handling this thread.' },
      { field: 'userId',                type: 'string',                     desc: 'The end user driving this conversation.' },
      { field: 'contextId',             type: 'string | undefined',         desc: 'Primary entity whose context is loaded. Context guard fires if undefined.' },
      { field: 'entityContext',          type: 'string',                     desc: 'Formatted entity context injected into the system prompt.' },
      { field: 'maxTurns',              type: 'number',                     desc: 'Hard cap on orchestration turns. Default: 50.' },
      { field: 'currentTurn',           type: 'number',                     desc: 'Incremented by the orchestrator every turn.' },
      { field: 'activeWorkflow',        type: 'string | undefined',         desc: 'Name of the currently active workflow.' },
      { field: 'activeWorkflowStep',    type: 'number',                     desc: 'Current step index within the active workflow.' },
      { field: 'stagedPlanData',        type: 'Record<string, any> | undefined', desc: 'Planner output awaiting user approval before execution.' },
      { field: 'stagedPlanFingerprint', type: 'string | undefined',         desc: 'Hash of staged plan data. Prevents duplicate execution.' },
      { field: 'awaitingApproval',      type: 'boolean',                    desc: 'Gate flag. Executor tools are blocked until user confirms.' },
      { field: 'activeEntityId',        type: 'string | undefined',         desc: 'ID of the domain entity currently being worked on.' },
      { field: 'lastExecutionRecord',   type: '{ fingerprint; entityId } | undefined', desc: 'Deduplication record for the most recent successful execution.' },
      { field: 'plannerFailureCount',   type: 'number',                     desc: 'Circuit breaker counter for planner specialists. Default: 0.' },
      { field: 'toolFailureCount',      type: 'number',                     desc: 'Circuit breaker counter for any specialist/tool. Default: 0.' },
      { field: 'lastFailedTool',        type: 'string | undefined',         desc: 'Name of the last tool that returned a failure-prefix response.' },
    ]} />

    <SubHeading>Custom Field Schema</SubHeading>
    <FieldTable rows={[
      { field: 'name',        type: 'string',               required: true, desc: 'Field name in camelCase' },
      { field: 'type',        type: 'string',               required: true, desc: 'TypeScript type string e.g. "string | undefined"' },
      { field: 'reducer',     type: "'latest' | 'concat' | 'custom'", required: true, desc: '"latest" = standard (x,y)=>y??x; "concat" = array concat; "custom" = custom reducerFn' },
      { field: 'default',     type: 'any',                              desc: 'Optional default value factory' },
      { field: 'description', type: 'string',                           desc: 'Purpose of this field' },
    ]} />

    <CodeBlock lang="manifest.state.customFields" code={`{
  "name": "lastPublishedEntityId",
  "type": "string | undefined",
  "reducer": "latest",
  "description": "ID of the last entity published to an external platform"
}`} />
  </section>
);

const SectionOrchestrator = () => (
  <section>
    <SectionHeading id="orchestrator" title="Orchestrator" subtitle='The fixed orchestrator node (always named "agent" in the graph). Built by the SDK runtime — agencies do not implement this directly.' />

    <InfoCard accent="purple">
      The orchestrator is the main LLM node. It binds to all registered sub-agent tools and emits tool calls to route to specialists. It assembles the system prompt from manifest fields every turn.
    </InfoCard>

    <SubHeading>System Prompt Sections</SubHeading>
    <FieldTable rows={[
      { field: '<identity>',           type: 'manifest',  desc: 'displayName + role + description from persona' },
      { field: '<core_mandates>',      type: 'manifest',  desc: 'Hard behavioral rules from persona.mandates[]' },
      { field: '<domain_vocabulary>',  type: 'manifest',  desc: 'persona.domainVocabulary key-value pairs' },
      { field: '<workflow_definitions>',type: 'manifest', desc: 'Serialized workflow steps, gates, and tool assignments' },
      { field: '<tool_architecture>',  type: 'derived',   desc: 'Auto-generated specialist descriptions from manifest.specialists[]' },
      { field: '<allowed_values>',     type: 'manifest',  desc: 'Domain enum values the LLM must use exactly' },
      { field: '<error_handling>',     type: 'sdk-fixed', desc: 'Retry rules, circuit breaker guidance, failure patterns' },
      { field: '<style_guide>',        type: 'manifest',  desc: 'persona.outputStyle[] formatting and communication rules' },
      { field: '<system_status>',      type: 'dynamic',   desc: 'Per-turn: date/time, activeWorkflow+step, awaitingApproval, contextId status' },
      { field: '<entity_context>',     type: 'dynamic',   desc: 'state.entityContext — formatted context bundle loaded at invocation' },
    ]} />
  </section>
);

const SectionRouting = () => (
  <section>
    <SectionHeading id="routing" title="Routing" subtitle="The shouldContinue() conditional edge selects the next node after every orchestrator turn. Guards are evaluated in a fixed order." />

    <SubHeading>Guard Evaluation Order</SubHeading>
    <div style={{ marginBottom: '1.5rem' }}>
      {[
        { guard: 'maxTurns',              condition: 'currentTurn ≥ maxTurns',                           result: 'end' },
        { guard: 'noToolCalls',           condition: 'no tool calls emitted',                             result: 'end' },
        { guard: 'contextGuard',          condition: 'data-dependent tool + contextId is sentinel value', result: 'context resolver node' },
        { guard: 'plannerCircuitBreaker', condition: 'planner tool + plannerFailureCount ≥ threshold',    result: 'end' },
        { guard: 'genericCircuitBreaker', condition: 'same tool as lastFailedTool + toolFailureCount ≥ threshold', result: 'end' },
        { guard: 'workflowApprovalGate', condition: 'blocked tool + no approval + missing staged plan',  result: 'end' },
        { guard: 'workflowStepGates',    condition: 'workflow step stateGates not satisfied',             result: 'end' },
        { guard: 'normalRouting',         condition: 'tool name found in nodeMap',                        result: 'nodeMap[toolName]' },
        { guard: 'unknownTool',           condition: 'tool name not in nodeMap',                          result: 'end' },
      ].map((row, i) => (
        <div key={i} style={{
          display: 'grid', gridTemplateColumns: '28px 180px 1fr auto',
          alignItems: 'center', gap: '0.75rem',
          padding: '0.6rem 0',
          borderBottom: '1px solid var(--color-border-primary)',
        }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--neutral-400)' }}>{i + 1}.</span>
          <Code>{row.guard}</Code>
          <span style={{ fontSize: '0.82rem', color: 'var(--color-text-body)' }}>{row.condition}</span>
          <Pill color={row.result === 'end' ? 'blue' : 'green'}>{row.result}</Pill>
        </div>
      ))}
    </div>

    <SubHeading>Tool Priority</SubHeading>
    <InfoCard>
      When the orchestrator emits multiple tool calls in one turn, <Code>pickOrchestratorToolCall(toolCalls, priorityList)</Code> selects the highest-priority tool from <Code>manifest.routing.toolPriority</Code>. Context resolver should always be first to prevent wasted turns.
    </InfoCard>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.5rem' }}>
      {['ask_context_resolver (1st)', 'standalone action tools', 'executor tools', 'publisher tools', 'creative tools', 'planner tools', 'editor tools', 'third-party managers', 'analytics tools', 'intelligence/research (last)'].map((t, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', fontFamily: 'monospace', background: 'var(--neutral-100)', border: '1px solid var(--color-border-primary)', borderRadius: '6px', padding: '3px 8px', color: 'var(--color-text-body)' }}>
          <span style={{ color: 'var(--neutral-400)', fontSize: '0.7rem' }}>{i + 1}</span> {t}
        </div>
      ))}
    </div>
  </section>
);

const SectionGuards = () => (
  <section>
    <SectionHeading id="guards" title="Guards" subtitle="Safety and control mechanisms. All thresholds and patterns are configurable in the manifest.guards block." />

    <FieldTable rows={[
      { field: 'plannerCircuitBreaker.threshold', type: 'number', desc: 'Consecutive planner failures before routing to end. Default: 2.' },
      { field: 'genericCircuitBreaker.threshold', type: 'number', desc: 'Consecutive same-tool failures before routing to end. Default: 3.' },
      { field: 'approvalPatterns',                type: 'string[]', desc: 'Regex patterns for recognising user approval. Replaces SDK defaults if provided.' },
      { field: 'contextGuard.sentinelValues',     type: 'string[]', desc: 'contextId values treated as "no entity connected". Default: ["system", "anonymous"].' },
      { field: 'contextGuard.behaviour',          type: "'guard' | 'warn' | 'allow'", desc: 'What happens when contextId is a sentinel value.' },
      { field: 'failurePrefixes',                 type: 'string[]', desc: 'Additional failure-detection prefixes beyond SDK defaults (Error:, FAILED:, STAGING_FAILED:, PIPELINE_FAILED:).' },
      { field: 'outputSanitization.stripPatterns',type: 'RegExp[]', desc: 'Patterns applied to every assistant response before returning to the caller. Use to strip internal reasoning tags.' },
    ]} />

    <SubHeading>Default Approval Patterns</SubHeading>
    <CodeBlock lang="regex patterns" code={`/^go ahead[.!\\s]*$/i      /^proceed[.!\\s]*$/i
/^approved?[.!\\s]*$/i    /^confirm(?:ed)?[.!\\s]*$/i
/^yes[.!\\s]*$/i          /^ok(?:ay)?[.!\\s]*$/i
/^sounds?\\s+good[.!\\s]*$/i   /^looks?\\s+good[.!\\s]*$/i
/^yes,?\\s+go ahead\\b/i  /^proceed\\s+with\\b/i`} />
  </section>
);

const SectionPatterns = () => (
  <section>
    <SectionHeading id="patterns" title="Specialist Patterns" subtitle="Each specialist uses one of five execution patterns. The pattern determines which SDK-provided runner wraps the specialist's implementation." />

    <PatternCard
      title="Thinking Loop"
      badge="thinking_loop"
      desc="Sub-LLM runs in an internal loop, calling internal tools until it has enough information to respond. Best for research, analysis, and intelligence-gathering tasks. Tool calls within a single sub-turn are executed concurrently via Promise.all()."
      impl="SDK: ThinkingLoopRunner  |  Agency: IThinkingLoopSpecialist"
    />
    <PatternCard
      title="Composio Manager"
      badge="composio_manager"
      desc="Wraps a Composio toolkit using a simple LLM agent loop. Best for external API management (CRMs, ad platforms, e-commerce, analytics). Composio connection resolved at runtime from contextId + toolkit name."
      impl="SDK: ComposioManagerRunner  |  Agency: declares composioToolkits[]"
    />
    <PatternCard
      title="Deterministic Pipeline"
      badge="deterministic_pipeline"
      desc="Executes a fixed sequence of steps without an LLM loop — validation, transformation, and persistence. Best for generative execution with known structure."
      impl="Agency: IDeterministicPipeline with steps[] array of async functions"
    />
    <PatternCard
      title="Simple LLM"
      badge="simple_llm"
      desc="Single LLM call with a custom system prompt and no tools. Best for copy generation, summarization, and classification."
      impl="SDK: SimpleLLMRunner  |  Agency: provides system prompt template and I/O mapping"
    />
    <PatternCard
      title="Custom"
      badge="custom"
      desc="Full control. Agency implements ISpecialistNode directly and returns messages plus any state patch."
      impl="ISpecialistNode { execute(state, args): Promise<SpecialistResult> }"
    />
  </section>
);

const SectionRegistration = () => (
  <section>
    <SectionHeading id="registration" title="Specialist Registration" subtitle="Schema for a single specialist entry in manifest.specialists[]." />

    <FieldTable rows={[
      { field: 'id',               type: 'string',   required: true, desc: 'Unique identifier, used as the LangGraph node name (snake_case)' },
      { field: 'displayName',      type: 'string',   required: true, desc: 'Human-readable label for logs and progress messages' },
      { field: 'pattern',          type: 'enum',     required: true, desc: 'thinking_loop | composio_manager | deterministic_pipeline | simple_llm | custom' },
      { field: 'implementation',   type: 'string',   required: true, desc: 'Module path to the ISpecialistNode implementation' },
      { field: 'subAgentTool',     type: 'ToolSchema', required: true, desc: 'Tool schema presented to the orchestrator LLM to trigger this specialist' },
      { field: 'model',            type: 'SpecialistModelConfig', desc: 'Per-specialist model override. Falls back to manifest.model.' },
      { field: 'internalTools',    type: 'string[]', desc: 'Names of internal tools available inside this specialist\'s thinking loop' },
      { field: 'composioToolkits', type: 'string[]', desc: 'Names of Composio toolkits available to this specialist' },
      { field: 'maxInternalTurns', type: 'number',   desc: 'Max sub-turns for thinking_loop specialists. Default: 20.' },
      { field: 'progressMessage',  type: 'string',   desc: 'Status string emitted on the progress emitter when this specialist starts. Supports {query} token.' },
      { field: 'isPlanner',        type: 'boolean',  desc: 'If true, uses planner circuit breaker + sets awaitingApproval and stagedPlanData on success.' },
      { field: 'isContextResolver',type: 'boolean',  desc: 'If true, this is the context guard\'s resolution target when contextId is undefined.' },
      { field: 'stateUpdates',     type: 'StateUpdateRule[]', desc: 'Declarative rules for how the orchestrator wrapper should update state from this specialist\'s result.' },
    ]} />

    <CodeBlock lang="manifest.specialists[]" code={`{
  "id": "campaign_strategist",
  "displayName": "Campaign Strategist",
  "pattern": "thinking_loop",
  "subAgentTool": {
    "name": "ask_campaign_strategist",
    "description": "Plan a new ad campaign: gather context, build a strategy checklist, and stage the plan for approval",
    "schema": { "type": "object", "properties": { "query": { "type": "string" } }, "required": ["query"] }
  },
  "model": { "temperature": 0.1 },
  "internalTools": ["entity_intelligence", "stage_plan"],
  "isPlanner": true,
  "progressMessage": "📋 Building campaign strategy..."
}`} />
  </section>
);

const SectionSpecialistResult = () => (
  <section>
    <SectionHeading id="specialist-result" title="Specialist Result" subtitle="Shape every specialist implementation must return." />

    <FieldTable rows={[
      { field: 'messages',         type: 'AIMessage[]', required: true, desc: 'At least one message with the specialist\'s response. Used as ToolMessage content back to orchestrator.' },
      { field: 'stagedPlanData',   type: 'any | undefined',   desc: 'Set by planner specialists — the plan awaiting user approval.' },
      { field: 'stagingSucceeded', type: 'boolean | undefined', desc: 'Set by planner specialists — whether staging succeeded.' },
      { field: 'entityId',         type: 'string | undefined', desc: 'Set by executor specialists after persisting a domain entity.' },
      { field: 'statePatches',     type: 'Record<string, any> | undefined', desc: 'Arbitrary state field updates for custom state fields.' },
    ]} />

    <SubHeading>Wrapper Behaviour</SubHeading>
    <InfoCard>
      The SDK orchestrator wrapper handles common patterns around every specialist call so implementations focus only on domain logic: extract tool call args → pass state + args to specialist → wrap output in ToolMessage → apply stateUpdates rules → update failure counters → emit progress message.
    </InfoCard>
    <SubHeading>Failure Detection</SubHeading>
    <InfoCard>
      Specialist result is classified as a failure if message content starts with any registered failure prefix. SDK defaults: <Code>Error:</Code> <Code>FAILED:</Code> <Code>STAGING_FAILED:</Code> <Code>PIPELINE_FAILED:</Code>. Additional prefixes can be added in <Code>manifest.guards.failurePrefixes[]</Code>.
    </InfoCard>
  </section>
);

const SectionSubAgentTools = () => (
  <section>
    <SectionHeading id="sub-agent-tools" title="Sub-Agent Tools" subtitle="Automatically derived from manifest.specialists[].subAgentTool at boot. The orchestrator LLM is bound to all registered tools." />

    <InfoCard accent="purple">
      <strong>Atomic rule:</strong> The orchestrator is instructed to make exactly ONE tool call per turn. When the LLM emits multiple, <Code>pickOrchestratorToolCall(toolCalls, priorityList)</Code> selects the highest-priority match.
    </InfoCard>

    <FieldTable rows={[
      { field: 'subAgentTool.name',        type: 'string',     required: true, desc: 'Tool name by convention: ask_{id} (e.g. ask_data_analyst)' },
      { field: 'subAgentTool.description', type: 'string',     required: true, desc: 'What the specialist does and when to use it. Written for the orchestrator LLM.' },
      { field: 'subAgentTool.schema',      type: 'JSONSchema',  required: true, desc: 'Arguments the orchestrator passes to this specialist (usually { query: string })' },
    ]} />
  </section>
);

const SectionInternalTools = () => (
  <section>
    <SectionHeading id="internal-tools" title="Internal Tools" subtitle="Named function tools called inside specialist thinking loops. Implement IInternalTool<TInput, TOutput>." />

    <FieldTable rows={[
      { field: 'name',           type: 'string',     required: true, desc: 'Unique tool name' },
      { field: 'description',    type: 'string',     required: true, desc: 'What this tool fetches or does (shown in system prompt for thinking_loop specialists)' },
      { field: 'schema',         type: 'JSONSchema',  required: true, desc: 'Input schema for the tool' },
      { field: 'execute',        type: 'function',    required: true, desc: '(input: TInput, context: ToolContext) => Promise<ToolResult<TOutput>>' },
    ]} />

    <SubHeading>Tool Context</SubHeading>
    <FieldTable rows={[
      { field: 'userId',        type: 'string',                desc: 'The end user driving the conversation.' },
      { field: 'contextId',     type: 'string | undefined',    desc: 'Primary entity ID currently connected.' },
      { field: 'agentId',       type: 'string',                desc: 'The agent handling this thread.' },
      { field: 'entityContext', type: 'EntityContextBundle',   desc: 'The loaded context bundle for the current entity.' },
    ]} />

    <InfoCard>
      <strong>Schema actions pattern:</strong> Define a schema with an <Code>action</Code> enum property. The tool implementation switches on <Code>action</Code> to fetch different data. This reduces tool count in the LLM context window — a single tool binding covers multiple fetching behaviours.
    </InfoCard>
  </section>
);

const SectionComposioTools = () => (
  <section>
    <SectionHeading id="composio-tools" title="Composio Toolkits" subtitle="Composio-backed external API toolkits used inside composio_manager pattern specialists." />

    <FieldTable rows={[
      { field: 'name',              type: 'string',    required: true, desc: 'Identifier referenced by specialists (e.g. "shopify", "googleads")' },
      { field: 'composioApp',       type: 'string',    required: true, desc: 'The Composio app name/slug' },
      { field: 'actions',           type: 'string[]',  required: true, desc: 'Explicit list of Composio action names to expose. Prefer explicit over wildcard.' },
      { field: 'authConfigEnvVar',  type: 'string',               desc: 'Env var holding a specific Composio auth config ID for this toolkit' },
      { field: 'connectionScope',   type: "'per_user' | 'per_context' | 'global'", desc: 'How connections are resolved. Default: per_context.' },
    ]} />

    <CodeBlock lang="manifest.tools.composioToolkits[]" code={`{
  "name": "meta_ads",
  "composioApp": "metaads",
  "actions": [
    "FACEBOOK_ADS_GET_INSIGHTS",
    "FACEBOOK_ADS_LIST_CAMPAIGNS",
    "FACEBOOK_ADS_UPDATE_CAMPAIGN",
    "FACEBOOK_ADS_GET_AD_ACCOUNTS"
  ],
  "connectionScope": "per_context"
}`} />
  </section>
);

const SectionWorkflowDefs = () => (
  <section>
    <SectionHeading id="workflow-definitions" title="Workflow Definitions" subtitle="Declarative multi-step workflows. The orchestrator is instructed to follow these sequences strictly via the system prompt." />

    <InfoCard accent="purple">
      Workflows are serialized into the <Code>&lt;workflow_definitions&gt;</Code> system prompt section with steps, gates, and tool assignments. The LLM uses trigger patterns to recognise when to initiate a workflow.
    </InfoCard>

    <FieldTable rows={[
      { field: 'id',              type: 'string',   required: true, desc: 'Unique workflow identifier' },
      { field: 'name',            type: 'string',   required: true, desc: 'Human-readable name' },
      { field: 'description',     type: 'string',   required: true, desc: 'When this workflow should be triggered' },
      { field: 'triggerPatterns', type: 'string[]', required: true, desc: 'Example phrases to help the LLM recognise trigger intent' },
      { field: 'steps',           type: 'WorkflowStep[]', required: true, desc: 'Ordered sequence of specialist tool calls' },
    ]} />

    <SubHeading>Workflow Step Schema</SubHeading>
    <FieldTable rows={[
      { field: 'stepNumber',      type: 'number',  required: true, desc: '1-indexed position in the sequence' },
      { field: 'name',            type: 'string',  required: true, desc: 'Step label for system prompt and logs' },
      { field: 'tool',            type: 'string',  required: true, desc: 'Sub-agent tool name to invoke (e.g. ask_data_analyst)' },
      { field: 'description',     type: 'string',  required: true, desc: 'What this step accomplishes' },
      { field: 'prerequisiteStep',type: 'number',              desc: 'Step that must complete before this one runs' },
      { field: 'approvalGate',    type: 'ApprovalGateConfig', desc: 'If present, workflow pauses and waits for user confirmation before advancing' },
      { field: 'autoAdvance',     type: 'boolean',             desc: 'If true, orchestrator calls the next step immediately after this one. Default: false.' },
      { field: 'stateGates',      type: 'StateGate[]',         desc: 'State field conditions that must be true before this step can run' },
    ]} />
  </section>
);

const SectionApprovalGates = () => (
  <section>
    <SectionHeading id="approval-gates" title="Approval Gates" subtitle="Approval gates pause a workflow step and wait for user confirmation before the next step can proceed." />

    <FieldTable rows={[
      { field: 'approvalGate.message',         type: 'string',   required: true, desc: 'The prompt shown to the user asking for approval' },
      { field: 'approvalGate.blockedTools',    type: 'string[]', required: true, desc: 'Tool names that must not be called until approval is given' },
      { field: 'approvalGate.approvalPatterns',type: 'string[]',              desc: 'Regex patterns that constitute user approval. SDK defaults apply if omitted.' },
    ]} />

    <CodeBlock lang="workflow step with approval gate" code={`{
  "stepNumber": 2,
  "name": "STRATEGY",
  "tool": "ask_campaign_strategist",
  "description": "Generate strategy checklist and stage plan",
  "approvalGate": {
    "message": "Does this strategy look good? Say 'Go ahead' to generate the campaign.",
    "blockedTools": ["ask_campaign_builder"]
  }
}`} />
  </section>
);

const SectionContextSystem = () => (
  <section>
    <SectionHeading id="context-system" title="Context System" subtitle="Loads a structured knowledge bundle for the entity the agent is working on behalf of and injects it into the system prompt." />

    <FieldTable rows={[
      { field: 'entityType',            type: 'string',  required: true, desc: 'What kind of entity owns context (e.g. "client", "account", "workspace", "brand")' },
      { field: 'loaderImplementation',  type: 'string',  required: true, desc: 'Module path to IContextLoader implementation' },
      { field: 'formatterImplementation',type: 'string',              desc: 'Module path to IContextFormatter. Falls back to SDK default Markdown formatter.' },
      { field: 'schema',                type: 'ContextFieldDefinition[]', required: true, desc: 'Declares the fields that make up the entity context bundle' },
      { field: 'emptyContextBehaviour', type: "'allow' | 'warn' | 'guard'", desc: 'What happens when contextId is undefined. Default: guard.' },
    ]} />

    <SubHeading>Interfaces</SubHeading>
    <CodeBlock lang="typescript" code={`interface IContextLoader {
  load(contextId: string, agentId: string): Promise<EntityContextBundle>
}

// EntityContextBundle = Record<string, any>
// Keys match contextFieldSchema keys declared in the manifest

interface IContextFormatter {
  format(bundle: EntityContextBundle, schema: ContextFieldDefinition[]): string
}
// Default: iterates schema fields in order, skips empty values,
// produces structured Markdown with labelled sections`} />
  </section>
);

const SectionContextGuard = () => (
  <section>
    <SectionHeading id="context-guard" title="Context Guard" subtitle="When emptyContextBehaviour is 'guard' and contextId is undefined (or a sentinel value), the conditional edge redirects to the context resolver specialist." />

    <InfoCard accent="purple">
      On resolution, the specialist must output a <Code>CONTEXT_RESOLVED:{'{'}{'{'}contextId{'}'}{'}'}</Code> tag in its message content. The orchestrator wrapper detects this, updates <Code>state.contextId</Code>, and reloads the context bundle.
    </InfoCard>

    <FieldTable rows={[
      { field: 'sentinelValues', type: 'string[]', desc: 'contextId values that indicate no entity context is connected. Default: ["system", "anonymous", "undefined", "null"].' },
      { field: 'isContextResolver', type: 'boolean (specialist field)', desc: 'Mark the specialist that resolves context. Its tool is always exempt from the guard.' },
    ]} />
  </section>
);

const SectionPersistence = () => (
  <section>
    <SectionHeading id="persistence" title="Persistence" subtitle="Two independent stores: a checkpoint store (LangGraph state continuity) and a thread store (conversational message history)." />

    <SubHeading>Checkpoint Store</SubHeading>
    <FieldTable rows={[
      { field: 'checkpointer.strategy',          type: "'sqlite' | 'memory' | 'custom'", required: true, desc: 'Persistence strategy. SQLite recommended for local; memory for serverless.' },
      { field: 'checkpointer.sqlitePath',        type: 'string',              desc: 'Path to SQLite DB file. Default: ./agentive-checkpoints.db' },
      { field: 'checkpointer.forceMemory',       type: 'boolean',             desc: 'Force MemorySaver even when SQLite is configured. Useful in serverless.' },
      { field: 'checkpointer.customImplementation', type: 'string',           desc: 'Module path to a LangGraph BaseCheckpointSaver implementation.' },
    ]} />

    <SubHeading>Thread Store Interface</SubHeading>
    <CodeBlock lang="typescript" code={`interface IThreadStore {
  ensureThread(params: { threadId, userId, agentId, title? }): Promise<void>
  appendMessages(params: { threadId, messages: PersistedMessage[] }): Promise<void>
  updateThreadTitle(params: { threadId, title }): Promise<void>
  loadMessages(params: { threadId, limit? }): Promise<PersistedMessage[]>
  listThreads(params: { userId, agentId, limit? }): Promise<ThreadSummary[]>
}`} />

    <SubHeading>Entity Store Interface</SubHeading>
    <CodeBlock lang="typescript" code={`interface IEntityStore {
  createEntity(params: CreateEntityParams): Promise<string>  // returns new entity ID
  updateEntity(params: UpdateEntityParams): Promise<void>
  getEntity(params: GetEntityParams): Promise<Record<string, any> | null>
  listEntities(params: ListEntitiesParams): Promise<EntitySummary[]>
}`} />
  </section>
);

const SectionStreaming = () => (
  <section>
    <SectionHeading id="streaming" title="Streaming" subtitle="Real-time progress and streaming events. Two types: status updates (specialist handoffs, tool executions) and content chunks (LLM token streaming)." />

    <SubHeading>Progress Emitter</SubHeading>
    <CodeBlock lang="typescript" code={`import { agentProgressEmitter, emitAgentStatus } from '@agentive/sdk'

// Channel pattern: status_{agentId}_{userId}
emitAgentStatus(agentId, userId, "📋 Building campaign strategy...")

// Event types
type DeepAgentProgressEvent =
  | { type: 'status'; status: string }
  | { type: 'chunk'; content: string }`} />

    <SubHeading>Stream Invocation</SubHeading>
    <CodeBlock lang="typescript" code={`app.stream(initialState, {
  configurable: { thread_id },
  recursionLimit: 100,
  streamMode: ['updates', 'messages', 'custom'],
  subgraphs: true
})
// Tuple shape: [namespace, mode, data]`} />

    <SubHeading>onProgress Callback</SubHeading>
    <FieldTable rows={[
      { field: 'onProgress', type: '(event: DeepAgentProgressEvent) => void', desc: 'Passed to orchestrateAgent(). Called for every status event (from emitter and LangGraph custom events) and every content chunk.' },
    ]} />
  </section>
);

const SectionEntrypoints = () => (
  <section>
    <SectionHeading id="entrypoints" title="Entrypoints" subtitle="SDK-provided use-case classes. The public API surface for application layers to interact with the agent runtime." />

    <SubHeading>RunAgentChatUseCase</SubHeading>
    <InfoCard>Execute one conversational turn. Validates input, invokes the LangGraph orchestrator, strips internal reasoning, returns the agent reply.</InfoCard>
    <FieldTable rows={[
      { field: 'agentId',       type: 'string',   required: true, desc: 'Must match a loaded agent manifest.' },
      { field: 'userId',        type: 'string',   required: true, desc: 'The end user.' },
      { field: 'contextId',     type: 'string | undefined',   desc: 'The entity context to load (e.g. client ID).' },
      { field: 'chatHistory',   type: 'Message[]', required: true, desc: 'Must be non-empty. Each: { role: "user"|"assistant", content: string }.' },
      { field: 'threadId',      type: 'string | undefined',   desc: 'Auto-generated if omitted: {agentId}_thread_{userId}_{timestamp}.' },
      { field: 'persistThread', type: 'boolean',              desc: 'Whether to persist the thread. Default: true.' },
      { field: 'onProgress',    type: 'callback',             desc: 'Optional streaming progress callback.' },
    ]} />

    <CodeBlock lang="typescript" code={`// Output shape
{
  message: string,          // agent reply (sanitized)
  threadId: string,
  metadata: {
    awaitingApproval: boolean,
    activeWorkflow: string | undefined,
    activeWorkflowStep: number | undefined,
    activeEntityId: string | undefined
  }
}`} />

    <SubHeading>AgentRuntime</SubHeading>
    <CodeBlock lang="typescript" code={`// Boot — loads manifest, builds graph, initialises checkpointer and stores
await AgentRuntime.boot('./agent-manifest.json')

// Access compiled graph
const graph = AgentRuntime.getAgent('aria')

// List all loaded agents
AgentRuntime.listAgents()  // string[]

// Shutdown
await AgentRuntime.shutdown()`} />
  </section>
);

const SectionModelConfig = () => (
  <section>
    <SectionHeading id="model-config" title="Model Config" subtitle="LLM model configuration. Provider is pluggable; the orchestrator pattern is fixed." />

    <FieldTable rows={[
      { field: 'provider',       type: "'google-genai' | 'openai' | 'anthropic' | 'azure-openai' | 'custom'", required: true, desc: 'LLM provider' },
      { field: 'modelId',        type: 'string',  required: true, desc: 'Model identifier for the chosen provider' },
      { field: 'temperature',    type: 'number',              desc: 'Default: 0.7' },
      { field: 'maxOutputTokens',type: 'number',              desc: 'Default: 8192' },
      { field: 'streaming',      type: 'boolean',             desc: 'Default: true' },
      { field: 'apiKeyEnvVar',   type: 'string',              desc: 'Env var name holding the API key' },
    ]} />

    <SubHeading>Temperature Guidance</SubHeading>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
      {[
        { label: 'Research & Intelligence', range: '0.1', color: 'var(--brand-secondary-500)' },
        { label: 'Planner & Strategy',      range: '0.1–0.3', color: 'var(--brand-secondary-400)' },
        { label: 'Manager & Analytics',     range: '0.3', color: 'var(--brand-neutral-700)' },
        { label: 'Orchestrator',             range: '0.7', color: 'var(--brand-primary-400)' },
        { label: 'Creative & Copy',          range: '0.7–0.9', color: 'var(--brand-primary-500)' },
      ].map(t => (
        <div key={t.label} style={{ border: '1px solid var(--color-border-primary)', borderRadius: '8px', padding: '0.75rem', background: 'var(--neutral-50)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>{t.label}</div>
          <div style={{ fontFamily: 'monospace', fontSize: '1rem', fontWeight: 700, color: t.color }}>{t.range}</div>
        </div>
      ))}
    </div>
  </section>
);

const SectionEnvironment = () => (
  <section>
    <SectionHeading id="environment" title="Environment Variables" subtitle="The SDK reads these at boot. Agencies configure them per deployment." />

    <SubHeading>Required</SubHeading>
    <FieldTable rows={[
      { field: 'AGENTIVE_LLM_API_KEY',     type: 'string', required: true, desc: 'Primary LLM provider API key. Name can be overridden via manifest.model.apiKeyEnvVar.' },
      { field: 'AGENTIVE_COMPOSIO_API_KEY', type: 'string',              desc: 'Composio platform API key. Required only if any specialist uses composio_manager pattern.' },
    ]} />

    <SubHeading>Optional</SubHeading>
    <FieldTable rows={[
      { field: 'AGENTIVE_SQLITE_PATH',       type: 'string',  desc: 'Custom path for SQLite checkpoint DB. Default: ./agentive-checkpoints.db' },
      { field: 'AGENTIVE_FORCE_MEMORY',      type: 'boolean', desc: '"true" to skip SQLite and always use MemorySaver. Recommended for serverless/edge.' },
      { field: 'AGENTIVE_MAX_TURNS',         type: 'number',  desc: 'Global override for state.maxTurns. Default: 50.' },
      { field: 'AGENTIVE_RECURSION_LIMIT',   type: 'number',  desc: 'LangGraph graph recursion limit. Default: 100.' },
      { field: 'AGENTIVE_LOG_LEVEL',         type: 'string',  desc: '"debug" | "info" | "warn" | "error". Default: info.' },
      { field: 'AGENTIVE_MANIFEST_PATH',     type: 'string',  desc: 'Path to agent manifest JSON. Overrides the path passed to AgentRuntime.boot(). Useful for containers.' },
    ]} />
  </section>
);

const SectionPersona = () => (
  <section>
    <SectionHeading id="persona" title="Persona" subtitle="Defines the agent's character, behavioral mandates, and output style. Injected into the system prompt as <identity> and <style_guide> blocks." />

    <FieldTable rows={[
      { field: 'displayName',     type: 'string',            required: true, desc: 'Name the agent uses to refer to itself' },
      { field: 'role',            type: 'string',            required: true, desc: 'Executive description of the agent\'s function' },
      { field: 'tone',            type: 'string',            required: true, desc: 'e.g. "Direct, executive, data-driven"' },
      { field: 'mandates',        type: 'string[]',          required: true, desc: 'Hard behavioral rules enforced in the system prompt every turn' },
      { field: 'outputStyle',     type: 'StyleRule[]',       required: true, desc: 'Formatting and communication rules for text output' },
      { field: 'domainVocabulary',type: 'Record<string, string>',           desc: 'Key terms the agent uses consistently. Maps concept names to preferred terminology.' },
    ]} />

    <CodeBlock lang="manifest.persona" code={`{
  "displayName": "Aria",
  "role": "AI marketing strategist and media buying orchestrator",
  "tone": "Direct, data-driven, executive",
  "mandates": [
    "Tool-First Execution: solve problems through tool calls, not conversation",
    "Atomic Operations: call exactly ONE tool per turn, never batch",
    "Strict State Management: always check active workflow step and staged context before acting",
    "Never claim an operation is complete unless a tool result confirms it with a real ID"
  ],
  "outputStyle": [
    "Deliver structured reports as clean bulleted markdown, never raw JSON",
    "Aim for fewer than 4 lines when confirming tool actions or transitions",
    "Never use conversational filler"
  ],
  "domainVocabulary": {
    "client": "the entity the agent works on behalf of",
    "activeEntity": "active campaign"
  }
}`} />
  </section>
);

const SectionExtensionPoints = () => (
  <section>
    <SectionHeading id="extension-points" title="Extension Points" subtitle="All the places an agency can plug in custom behaviour without modifying SDK internals." />

    <TwoCol
      left={
        <>
          <SubHeading>Developer Layer Interfaces</SubHeading>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {['ISpecialistNode', 'IThinkingLoopSpecialist', 'IDeterministicPipeline', 'IInternalTool', 'IContextLoader', 'IContextFormatter', 'IThreadStore', 'IEntityStore', 'BaseCheckpointSaver'].map(i => (
              <div key={i} style={{ fontSize: '0.78rem', fontFamily: 'monospace', background: 'var(--brand-secondary-25)', border: '1px solid var(--brand-secondary-400)', borderRadius: 'var(--m3-shape-small)', padding: '4px 8px', color: 'var(--brand-secondary-500)' }}>{i}</div>
            ))}
          </div>
        </>
      }
      right={
        <>
          <SubHeading>Manifest Config Points</SubHeading>
          <div style={{ fontSize: '0.83rem', color: 'var(--color-text-body)', lineHeight: 1.7 }}>
            {['specialists — dynamic graph from manifest', 'workflows — approval gates & state guards', 'tools.internalTools — function tools', 'tools.composioToolkits — external APIs', 'context.schema — entity bundle fields', 'guards — circuit breakers & approval patterns', 'routing.toolPriority — multi-tool resolution', 'persona — mandates & domain vocabulary', 'state.customFields — domain-specific state'].map(p => (
              <div key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', padding: '2px 0' }}>
                <span style={{ color: 'var(--brand-secondary-500)', marginTop: '2px', flexShrink: 0 }}>›</span>
                <span>{p}</span>
              </div>
            ))}
          </div>
        </>
      }
    />
  </section>
);

const SectionDomainProfiles = () => (
  <section>
    <SectionHeading id="domain-profiles" title="Domain Profiles" subtitle="Pre-built domain profiles. Each is a complete manifest scaffold for a specific agency type." />

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.875rem', marginBottom: '2rem' }}>
      {[
        { domain: 'Marketing Agency',  entity: 'client',      specialists: ['intelligence_researcher', 'campaign_strategist', 'campaign_builder', 'creative_generator', 'copy_writer', 'platform_publisher', 'analytics_manager'] },
        { domain: 'Legal Agency',      entity: 'matter',      specialists: ['document_researcher', 'contract_drafter', 'compliance_checker', 'deadline_tracker'] },
        { domain: 'Creative Agency',   entity: 'project',     specialists: ['brief_analyst', 'concept_generator', 'asset_producer', 'client_presenter'] },
        { domain: 'Recruitment Agency',entity: 'requisition', specialists: ['job_analyst', 'candidate_sourcer', 'screening_agent', 'pipeline_manager'] },
        { domain: 'Growth / SEO Agency',entity: 'website',   specialists: ['audit_researcher', 'content_strategist', 'keyword_analyst', 'report_generator'] },
      ].map(p => (
        <div key={p.domain} style={{ border: '1px solid var(--color-border-primary)', borderRadius: '10px', padding: '1rem 1.25rem', background: 'var(--neutral-50)' }}>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text-heading)', marginBottom: '0.3rem' }}>{p.domain}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginBottom: '0.6rem' }}>entity: <Code>{p.entity}</Code></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {p.specialists.map(s => <Pill key={s}>{s}</Pill>)}
          </div>
        </div>
      ))}
    </div>

    <SubHeading>Marketing Agency — Full Manifest Example</SubHeading>
    <CodeBlock lang="agent-manifest.json (marketing)" code={`{
  "id": "aria",
  "name": "Aria",
  "model": { "provider": "google-genai", "modelId": "gemini-2.0-flash", "temperature": 0.7 },
  "workflows": [{
    "id": "campaign_creation",
    "triggerPatterns": ["create a campaign", "launch a new campaign"],
    "steps": [
      { "stepNumber": 1, "name": "RESEARCH",  "tool": "ask_intelligence_researcher", "autoAdvance": false },
      { "stepNumber": 2, "name": "STRATEGY",  "tool": "ask_campaign_strategist",
        "approvalGate": { "message": "Approve strategy?", "blockedTools": ["ask_campaign_builder"] } },
      { "stepNumber": 3, "name": "BUILD",     "tool": "ask_campaign_builder", "autoAdvance": true,
        "stateGates": [{ "field": "awaitingApproval", "condition": "isTrue" }] },
      { "stepNumber": 4, "name": "CREATIVE",  "tool": "ask_creative_generator", "autoAdvance": true },
      { "stepNumber": 5, "name": "COPY",      "tool": "ask_copy_writer" }
    ]
  }],
  "routing": {
    "toolPriority": ["ask_context_resolver", "ask_campaign_builder",
      "ask_platform_publisher", "ask_creative_generator", "ask_copy_writer",
      "ask_campaign_strategist", "ask_analytics_manager", "ask_intelligence_researcher"]
  }
}`} />
  </section>
);

// ─── Section Map ───────────────────────────────────────────────────────────────

const SECTION_COMPONENTS: Record<string, React.ComponentType> = {
  'overview':              SectionOverview,
  'manifest':              SectionManifest,
  'layer-model':           SectionLayerModel,
  'state':                 SectionState,
  'orchestrator':          SectionOrchestrator,
  'routing':               SectionRouting,
  'guards':                SectionGuards,
  'patterns':              SectionPatterns,
  'registration':          SectionRegistration,
  'specialist-result':     SectionSpecialistResult,
  'sub-agent-tools':       SectionSubAgentTools,
  'internal-tools':        SectionInternalTools,
  'composio-tools':        SectionComposioTools,
  'workflow-definitions':  SectionWorkflowDefs,
  'approval-gates':        SectionApprovalGates,
  'context-system':        SectionContextSystem,
  'context-guard':         SectionContextGuard,
  'persistence':           SectionPersistence,
  'streaming':             SectionStreaming,
  'entrypoints':           SectionEntrypoints,
  'model-config':          SectionModelConfig,
  'environment':           SectionEnvironment,
  'persona':               SectionPersona,
  'extension-points':      SectionExtensionPoints,
  'domain-profiles':       SectionDomainProfiles,
};

// ─── Main Component ────────────────────────────────────────────────────────────

interface AgentiveSDKProps {
  activeId: string;
}

export default function AgentiveSDK({ activeId }: AgentiveSDKProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeId]);

  const SectionComp = SECTION_COMPONENTS[activeId] ?? SectionOverview;

  return (
    <div
      style={{
        flex: 1,
        minHeight: 0,
        background: 'var(--color-surface-primary)',
        border: '1px solid var(--color-border-primary)',
        borderRadius: 'var(--m3-shape-extra-large)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div
        ref={containerRef}
        className="comp-detail-card"
        style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'thin', paddingLeft: '3rem', paddingRight: '3rem' }}
      >
        <SectionComp />
      </div>
    </div>
  );
}
