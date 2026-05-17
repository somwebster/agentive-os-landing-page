import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';

// ─── Component Data ────────────────────────────────────────────────────────────

const GROUPS = [
  { id: 'primitives', label: 'Primitives',   ids: ['Button','ButtonPill','ButtonRounded','BrandCheckbox','Input','Slider','Badge','Avatar','CollaboratorAvatar'] },
  { id: 'chat',       label: 'Chat',         ids: ['AIBubble','UserBubble','AIStatusBar','Composer','AgentLoader','ChatBox','SideChat','GeminiEmptyState'] },
  { id: 'cards',      label: 'Cards',        ids: ['Card','GlassMetricCard','GlassActionCard','DescriptionCard','CampaignListCard'] },
  { id: 'previews',   label: 'Previews',     ids: ['EmailPreviewCard','InstagramPreviewCard','FacebookPreviewCard','GoogleBusinessPreviewCard','PreviewSlider'] },
  { id: 'navigation', label: 'Navigation',   ids: ['KommerceSidebarNav','KommerceTabNav','TopBar','SpotlightSearch'] },
  { id: 'surface',    label: 'Surface',      ids: ['Dialog','Toast','ToastContainer','Tooltip'] },
  { id: 'feedback',   label: 'Feedback',     ids: ['Skeleton','PageLoader','ShimmerImage'] },
  { id: 'data',       label: 'Data display', ids: ['Table','Collapsible','MonthViewCalendar','TimelineCard','TimelineDot','InteractiveTags','StaticTags'] },
  { id: 'layout',     label: 'Layout',       ids: ['AppLayout','BentoGrid','HeroHeader','SuggestionPanel','BrandAuditGrid'] },
  { id: 'fx',         label: 'Effects',      ids: ['AnimatedBeam','BorderBeam'] },
];

interface ComponentSpec {
  category: string;
  description: string;
  path: string;
  subComponents?: string[];
  variants?: Record<string, string[]>;
  props?: { name: string; type: string; required?: boolean; default?: string }[];
  spec?: Record<string, string>;
}

const COMPONENTS: Record<string, ComponentSpec> = {
  Button: {
    category: 'Button', description: 'Base shadcn-style button using CVA. Supports 6 variants and 4 sizes.',
    path: 'components/ui/button.tsx',
    variants: { variant: ['default','destructive','outline','secondary','ghost','link'], size: ['default','sm','lg','icon'] },
    props: [
      { name: 'variant', type: 'variant', default: 'default' },
      { name: 'size', type: 'size', default: 'default' },
      { name: 'asChild', type: 'boolean', default: 'false' },
      { name: 'disabled', type: 'boolean', default: 'false' },
    ],
    spec: { 'Radius': 'rounded-md', 'Padding (default)': 'h-10 px-4 py-2', 'Transition': 'transition-colors', 'Focus': 'ring-2 ring-ring ring-offset-2' },
  },
  ButtonPill: {
    category: 'Button', description: 'Pill-shaped button with optional Material Symbols icons. Four variants × three sizes.',
    path: 'components/ui/buttons/ButtonPill.tsx',
    variants: { variant: ['primary','transparent','outlined','outlined-on-action'], size: ['sm','md','lg'] },
    props: [
      { name: 'label', type: 'string', required: true },
      { name: 'leftIcon', type: 'icon name' },
      { name: 'rightIcon', type: 'icon name' },
      { name: 'variant', type: 'variant', default: 'primary' },
      { name: 'size', type: 'size', default: 'md' },
      { name: 'disabled', type: 'boolean' },
    ],
    spec: { 'Radius': 'rounded-3xl', 'Padding md': 'px-5 py-2', 'Icon size md': '28px', 'Transition': 'all 200ms ease-in-out' },
  },
  ButtonRounded: {
    category: 'Button', description: 'Circular icon-only button on a fixed 48×48 frame.',
    path: 'components/ui/button-rounded/ButtonRounded.tsx',
    variants: { variant: ['primary','transparent','outlined'] },
    props: [
      { name: 'iconName', type: 'icon name', required: true },
      { name: 'variant', type: 'variant', default: 'primary' },
      { name: 'iconSize', type: 'number', default: '24' },
    ],
    spec: { 'Frame': 'h-12 w-12', 'Padding': 'p-3', 'Radius': 'rounded-full' },
  },
  BrandCheckbox: {
    category: 'Form', description: 'Square pill checkbox. Uses inset shadow in checked state instead of fill swap.',
    path: 'components/ui/buttons/BrandCheckbox.tsx',
    props: [
      { name: 'checked', type: 'boolean' },
      { name: 'onCheckedChange', type: '(b: boolean) => void' },
      { name: 'disabled', type: 'boolean' },
    ],
    spec: { 'Size': 'size-9 p-0', 'Radius': 'rounded-3xl', 'Shadow (checked)': 'inset 0 0 4px var(--color-border-action)' },
  },
  Input: {
    category: 'Form', description: 'Base text input. Tailwind ring focus style with disabled affordance.',
    path: 'components/ui/input.tsx',
    props: [
      { name: 'type', type: 'string' }, { name: 'placeholder', type: 'string' }, { name: 'disabled', type: 'boolean' },
    ],
    spec: { 'Height': 'h-10', 'Radius': 'rounded-md', 'Padding': 'px-3 py-2', 'Focus': 'ring-2 ring-ring' },
  },
  Slider: {
    category: 'Form', description: 'Range slider with optional floating tooltip on thumb.',
    path: 'components/ui/slider.tsx',
    props: [
      { name: 'value', type: 'number[]' }, { name: 'onValueChange', type: '(v: number[]) => void' },
      { name: 'min / max / step', type: 'number' }, { name: 'showTooltip', type: 'boolean' },
    ],
    spec: { 'Track': 'h-1.5 rounded-full', 'Thumb': 'rounded-full h-4 w-4' },
  },
  Badge: {
    category: 'Display', description: 'Inline status / label pill. 4 variants.',
    path: 'components/ui/badge.tsx',
    variants: { variant: ['default','secondary','destructive','outline'] },
    props: [{ name: 'variant', type: 'variant', default: 'default' }, { name: 'children', type: 'ReactNode' }],
    spec: { 'Radius': 'rounded-full', 'Padding': 'px-2.5 py-0.5', 'Font': 'text-xs font-semibold' },
  },
  Avatar: {
    category: 'Display', description: 'Radix Avatar with image + fallback subcomponents.',
    path: 'components/ui/avatar.tsx',
    subComponents: ['AvatarImage', 'AvatarFallback'],
    props: [{ name: 'src', type: 'string' }, { name: 'alt', type: 'string' }],
    spec: { 'Size': 'h-10 w-10', 'Radius': 'rounded-full' },
  },
  CollaboratorAvatar: {
    category: 'Display', description: 'Overlapping dual-avatar for user + collaborator pairings.',
    path: 'components/ui/collaboratoravatar.tsx',
    variants: { size: ['sm', 'md'] },
    props: [{ name: 'size', type: 'sm | md', default: 'md' }],
    spec: { 'Overlap': '-ml-3', 'Ring': 'ring-2 ring-surface-primary' },
  },
  AIBubble: {
    category: 'Chat', description: 'AI message bubble with avatar, animated status bar, and optional streaming shimmer.',
    path: 'components/ui/ai-bubble/AIBubble.tsx',
    subComponents: ['AIStatusBar', 'AgentLoader'],
    props: [
      { name: 'message', type: 'string', required: true }, { name: 'agentName', type: 'string' },
      { name: 'streaming', type: 'boolean', default: 'false' }, { name: 'status', type: 'string' },
    ],
    spec: { 'Radius': 'rounded-2xl rounded-tl-sm', 'Padding': 'p-4', 'Max width': 'max-w-[85%]' },
  },
  UserBubble: {
    category: 'Chat', description: 'User message bubble, right-aligned.',
    path: 'components/ui/user-bubble/UserBubble.tsx',
    props: [{ name: 'message', type: 'string', required: true }],
    spec: { 'Radius': 'rounded-2xl rounded-tr-sm', 'Alignment': 'ml-auto', 'Background': 'surface-action' },
  },
  AIStatusBar: {
    category: 'Chat', description: 'Animated shimmer bar shown below an AI bubble while streaming.',
    path: 'components/ui/ai-bubble/AIStatusBar.tsx',
    props: [{ name: 'status', type: 'string' }, { name: 'active', type: 'boolean', default: 'true' }],
    spec: { 'Height': 'h-6', 'Animation': 'shimmer 1.5s linear infinite' },
  },
  Composer: {
    category: 'Chat', description: 'Full-featured message input with attachment and send controls. Four interaction states.',
    path: 'components/chat/Composer.tsx',
    variants: { state: ['default','hover','selected','processing'] },
    props: [
      { name: 'onSend', type: '(msg: string) => void', required: true },
      { name: 'placeholder', type: 'string' }, { name: 'processing', type: 'boolean' },
    ],
    spec: { 'Radius': 'rounded-3xl', 'Padding': 'px-4 py-3', 'Transition': 'box-shadow 200ms' },
  },
  AgentLoader: {
    category: 'Chat', description: 'Three-dot animated loader in AI bubble colours. Sits inline with status text.',
    path: 'components/ui/agent-loader/AgentLoader.tsx',
    props: [{ name: 'size', type: 'sm | md', default: 'md' }],
    spec: { 'Dot size sm / md': '6px / 8px', 'Animation': 'bounce 0.6s infinite staggered' },
  },
  ChatBox: {
    category: 'Chat', description: 'Scrollable message thread container that hosts AIBubble and UserBubble.',
    path: 'components/chat/ChatBox.tsx',
    props: [
      { name: 'messages', type: 'Message[]', required: true },
      { name: 'onSend', type: '(msg: string) => void', required: true },
    ],
    spec: { 'Layout': 'flex-col gap-4 overflow-y-auto', 'Padding': 'p-4' },
  },
  SideChat: {
    category: 'Chat', description: 'Collapsible side-panel chat overlay (desktop).',
    path: 'components/chat/SideChat.tsx',
    props: [{ name: 'open', type: 'boolean' }, { name: 'onClose', type: '() => void' }],
    spec: { 'Width': 'w-80', 'Radius': 'rounded-3xl', 'Shadow': 'shadow-xl' },
  },
  GeminiEmptyState: {
    category: 'Chat', description: 'Empty state prompt grid shown when chat thread is blank.',
    path: 'components/chat/GeminiEmptyState.tsx',
    props: [{ name: 'onSelect', type: '(prompt: string) => void' }],
    spec: { 'Grid': '2-col gap-3', 'Card radius': 'rounded-2xl' },
  },
  Card: {
    category: 'Card', description: 'Base card container with border, radius, and shadow tokens.',
    path: 'components/ui/card.tsx',
    subComponents: ['CardHeader', 'CardTitle', 'CardDescription', 'CardContent', 'CardFooter'],
    props: [{ name: 'className', type: 'string' }, { name: 'children', type: 'ReactNode' }],
    spec: { 'Radius': 'rounded-3xl', 'Border': '1px solid --border-primary', 'Shadow': '--shadow-sm' },
  },
  GlassMetricCard: {
    category: 'Card', description: 'Frosted-glass metric card with trend indicator. Used on dashboards.',
    path: 'components/ui/glass-metric-card/GlassMetricCard.tsx',
    props: [
      { name: 'title', type: 'string', required: true }, { name: 'value', type: 'string', required: true },
      { name: 'trend', type: 'number' }, { name: 'trendLabel', type: 'string' },
    ],
    spec: { 'Background': 'rgba(255,255,255,0.6) + backdrop-blur', 'Radius': 'rounded-3xl', 'Border': '1px solid rgba(255,255,255,0.4)' },
  },
  GlassActionCard: {
    category: 'Card', description: 'CTA card with glass finish, icon, and action button.',
    path: 'components/ui/glass-action-card/GlassActionCard.tsx',
    props: [
      { name: 'title', type: 'string', required: true }, { name: 'description', type: 'string' },
      { name: 'iconName', type: 'icon name' }, { name: 'onAction', type: '() => void' },
    ],
    spec: { 'Background': 'glass', 'Radius': 'rounded-3xl', 'Padding': 'p-6' },
  },
  DescriptionCard: {
    category: 'Card', description: 'Informational card: title, body text, optional badge and link.',
    path: 'components/ui/description-card/DescriptionCard.tsx',
    props: [
      { name: 'title', type: 'string', required: true }, { name: 'body', type: 'string' },
      { name: 'badge', type: 'string' }, { name: 'href', type: 'string' },
    ],
    spec: { 'Padding': 'p-5', 'Radius': 'rounded-2xl', 'Body font': 'text-sm text-text-body' },
  },
  CampaignListCard: {
    category: 'Card', description: 'Row card for campaign lists — status dot, name, KPIs, actions.',
    path: 'components/campaigns/CampaignListCard.tsx',
    props: [
      { name: 'name', type: 'string', required: true }, { name: 'status', type: 'active | paused | draft' },
      { name: 'kpis', type: 'KPI[]' }, { name: 'onEdit', type: '() => void' },
    ],
    spec: { 'Layout': 'flex items-center gap-4', 'Radius': 'rounded-2xl', 'Padding': 'px-4 py-3' },
  },
  EmailPreviewCard: {
    category: 'Preview', description: 'Email creative preview — subject, sender, body copy on a glass card.',
    path: 'components/previews/EmailPreviewCard.tsx',
    props: [
      { name: 'subject', type: 'string', required: true }, { name: 'sender', type: 'string' },
      { name: 'body', type: 'string' }, { name: 'imageUrl', type: 'string' },
    ],
    spec: { 'Width': '320px', 'Background': 'glass', 'Radius': 'rounded-3xl' },
  },
  InstagramPreviewCard: {
    category: 'Preview', description: 'Instagram post preview with story-ring avatar, caption, and engagement row.',
    path: 'components/previews/InstagramPreviewCard.tsx',
    props: [
      { name: 'imageUrl', type: 'string', required: true }, { name: 'caption', type: 'string' },
      { name: 'likes', type: 'number' }, { name: 'handle', type: 'string' },
    ],
    spec: { 'Width': '300px', 'Aspect ratio': '4:5 feed', 'Radius': 'rounded-3xl' },
  },
  FacebookPreviewCard: {
    category: 'Preview', description: 'Facebook post / ad preview with brand logo, copy, CTA button.',
    path: 'components/previews/FacebookPreviewCard.tsx',
    props: [
      { name: 'imageUrl', type: 'string', required: true }, { name: 'headline', type: 'string' },
      { name: 'body', type: 'string' }, { name: 'ctaLabel', type: 'string' },
    ],
    spec: { 'Width': '320px', 'CTA style': 'ButtonPill primary', 'Radius': 'rounded-3xl' },
  },
  GoogleBusinessPreviewCard: {
    category: 'Preview', description: 'Google Business profile card preview.',
    path: 'components/previews/GoogleBusinessPreviewCard.tsx',
    props: [{ name: 'name', type: 'string', required: true }, { name: 'rating', type: 'number' }],
    spec: { 'Width': '300px', 'Radius': 'rounded-3xl' },
  },
  PreviewSlider: {
    category: 'Preview', description: 'Before/after image slider for creative comparison.',
    path: 'components/previews/PreviewSlider.tsx',
    props: [
      { name: 'before', type: 'string', required: true }, { name: 'after', type: 'string', required: true },
    ],
    spec: { 'Handle': '2px border + circle thumb', 'Transition': 'none (drag-live)' },
  },
  KommerceSidebarNav: {
    category: 'Navigation', description: 'Collapsible sidebar nav with icon + label rows and nested groups.',
    path: 'components/navigation/KommerceSidebarNav.tsx',
    variants: { collapsed: ['false','true'] },
    props: [
      { name: 'items', type: 'NavItem[]', required: true }, { name: 'activeId', type: 'string' },
      { name: 'collapsed', type: 'boolean', default: 'false' },
    ],
    spec: { 'Width expanded': '240px', 'Width collapsed': '72px', 'Radius': 'rounded-3xl', 'Transition': 'width 200ms' },
  },
  KommerceTabNav: {
    category: 'Navigation', description: 'Horizontal tab bar with animated sliding underline indicator.',
    path: 'components/navigation/KommerceTabNav.tsx',
    props: [
      { name: 'tabs', type: 'Tab[]', required: true }, { name: 'activeId', type: 'string' },
      { name: 'onChange', type: '(id: string) => void' },
    ],
    spec: { 'Indicator': '2px bottom border, layout-animated', 'Gap': 'gap-1' },
  },
  TopBar: {
    category: 'Navigation', description: 'App top bar with breadcrumb, search trigger, and action slot.',
    path: 'components/navigation/TopBar.tsx',
    props: [
      { name: 'breadcrumbs', type: 'string[]' }, { name: 'onSearch', type: '() => void' },
      { name: 'actions', type: 'ReactNode' },
    ],
    spec: { 'Height': 'h-14', 'Background': 'surface-primary / glass', 'Border': 'border-b border-primary' },
  },
  SpotlightSearch: {
    category: 'Navigation', description: 'Full-screen command palette overlay. ⌘K shortcut.',
    path: 'components/navigation/SpotlightSearch.tsx',
    props: [
      { name: 'open', type: 'boolean' }, { name: 'onClose', type: '() => void' },
      { name: 'items', type: 'SearchItem[]' },
    ],
    spec: { 'Max width': '560px', 'Backdrop': 'bg-black/40 blur-sm', 'Radius': 'rounded-3xl' },
  },
  Dialog: {
    category: 'Surface', description: 'Radix Dialog with inset glass header, slot for actions.',
    path: 'components/ui/dialog.tsx',
    subComponents: ['DialogTrigger','DialogContent','DialogHeader','DialogFooter'],
    props: [
      { name: 'open', type: 'boolean' }, { name: 'onOpenChange', type: '(b: boolean) => void' },
      { name: 'title', type: 'string' },
    ],
    spec: { 'Max width': 'max-w-lg', 'Radius': 'rounded-3xl', 'Backdrop': 'bg-black/40' },
  },
  Toast: {
    category: 'Surface', description: 'Animated notification toast. 4 variants.',
    path: 'components/ui/toast.tsx',
    variants: { variant: ['default','success','warning','error'] },
    props: [
      { name: 'title', type: 'string', required: true }, { name: 'description', type: 'string' },
      { name: 'variant', type: 'variant', default: 'default' }, { name: 'onDismiss', type: '() => void' },
    ],
    spec: { 'Width': 'w-80', 'Radius': 'rounded-2xl', 'Animation': 'slide-in from bottom-right' },
  },
  ToastContainer: {
    category: 'Surface', description: 'Fixed viewport container that manages toast stacking and exit animations.',
    path: 'components/ui/toast-container.tsx',
    props: [{ name: 'position', type: 'bottom-right | top-right', default: 'bottom-right' }],
    spec: { 'Position': 'fixed bottom-4 right-4', 'Stack gap': 'gap-2', 'Z-index': '9999' },
  },
  Tooltip: {
    category: 'Surface', description: 'Radix Tooltip with custom content, delay, and side props.',
    path: 'components/ui/tooltip.tsx',
    props: [
      { name: 'content', type: 'ReactNode', required: true },
      { name: 'side', type: 'top | right | bottom | left', default: 'top' },
      { name: 'delay', type: 'number', default: '400' },
    ],
    spec: { 'Background': 'text-heading color', 'Radius': 'rounded-lg', 'Font': 'text-xs' },
  },
  Skeleton: {
    category: 'Feedback', description: 'Shimmer placeholder for loading states. Renders any shape.',
    path: 'components/ui/skeleton.tsx',
    props: [{ name: 'className', type: 'string' }],
    spec: { 'Animation': 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite', 'Background': 'neutral-100' },
  },
  PageLoader: {
    category: 'Feedback', description: 'Full-page loading state with centered brand mark animation.',
    path: 'components/ui/page-loader/PageLoader.tsx',
    spec: { 'Position': 'fixed inset-0', 'Z-index': '9999', 'Background': 'surface-background' },
  },
  ShimmerImage: {
    category: 'Feedback', description: 'Image component that shows shimmer placeholder until src loads.',
    path: 'components/ui/shimmer-image/ShimmerImage.tsx',
    props: [
      { name: 'src', type: 'string', required: true }, { name: 'alt', type: 'string' },
      { name: 'className', type: 'string' },
    ],
    spec: { 'Fallback': 'Skeleton same dimensions', 'Transition': 'opacity 300ms on load' },
  },
  Table: {
    category: 'Data', description: 'Data table with sortable columns, selection, and pagination.',
    path: 'components/ui/table.tsx',
    subComponents: ['TableHeader','TableBody','TableRow','TableCell','TableHead'],
    props: [
      { name: 'columns', type: 'Column[]', required: true }, { name: 'data', type: 'T[]', required: true },
      { name: 'onSort', type: '(col: string) => void' },
    ],
    spec: { 'Row height': 'h-12', 'Header': 'text-xs mono uppercase opacity-60', 'Divider': '1px border-primary' },
  },
  Collapsible: {
    category: 'Data', description: 'Radix Collapsible with animated height transition.',
    path: 'components/ui/collapsible.tsx',
    subComponents: ['CollapsibleTrigger','CollapsibleContent'],
    spec: { 'Animation': 'data-[state=open] animate-collapsible-down', 'Overflow': 'hidden' },
  },
  MonthViewCalendar: {
    category: 'Data', description: 'Monthly calendar grid with event dots and day selection.',
    path: 'components/ui/calendar/MonthViewCalendar.tsx',
    props: [
      { name: 'value', type: 'Date' }, { name: 'onDateSelect', type: '(d: Date) => void' },
      { name: 'events', type: 'CalendarEvent[]' },
    ],
    spec: { 'Grid': '7-col', 'Day size': 'h-9 w-9 rounded-full', 'Today ring': 'ring-1 ring-primary' },
  },
  TimelineCard: {
    category: 'Data', description: 'Vertical timeline event card with icon, timestamp, and body.',
    path: 'components/timeline/TimelineCard.tsx',
    props: [
      { name: 'title', type: 'string', required: true }, { name: 'timestamp', type: 'string' },
      { name: 'body', type: 'string' }, { name: 'iconName', type: 'icon name' },
    ],
    spec: { 'Connector': '2px dashed border-primary', 'Padding': 'pl-8 pb-6', 'Radius': 'rounded-2xl' },
  },
  TimelineDot: {
    category: 'Data', description: 'Dot / node on a timeline connector line.',
    path: 'components/timeline/TimelineDot.tsx',
    variants: { variant: ['default','active','complete','error'] },
    spec: { 'Size': '12px', 'Position': 'absolute left-0 top-1.5', 'Ring on active': 'ring-2 ring-primary/30' },
  },
  InteractiveTags: {
    category: 'Data', description: 'Tag group where tags toggle selected/deselected state.',
    path: 'components/ui/tags/InteractiveTags.tsx',
    props: [
      { name: 'tags', type: 'string[]', required: true }, { name: 'selected', type: 'string[]' },
      { name: 'onChange', type: '(selected: string[]) => void' },
    ],
    spec: { 'Radius': 'rounded-full', 'Active': 'bg-primary-50 text-primary-700 border-primary-200' },
  },
  StaticTags: {
    category: 'Data', description: 'Read-only tag group for display.',
    path: 'components/ui/tags/StaticTags.tsx',
    props: [{ name: 'tags', type: 'string[]', required: true }],
    spec: { 'Radius': 'rounded-full', 'Style': 'outline variant' },
  },
  AppLayout: {
    category: 'Layout', description: 'Top-level layout shell: sidebar + content area + optional top bar.',
    path: 'components/layout/AppLayout.tsx',
    props: [
      { name: 'sidebar', type: 'ReactNode' }, { name: 'topBar', type: 'ReactNode' },
      { name: 'children', type: 'ReactNode' },
    ],
    spec: { 'Grid': 'sidebar-width 1fr', 'Min height': '100vh', 'Gap': '16px', 'Padding': '16px' },
  },
  BentoGrid: {
    category: 'Layout', description: 'Responsive asymmetric bento-style card grid.',
    path: 'components/layout/BentoGrid.tsx',
    props: [{ name: 'items', type: 'BentoItem[]', required: true }],
    spec: { 'Grid': 'auto-fit minmax(280px, 1fr)', 'Gap': '16px', 'Item radius': 'rounded-3xl' },
  },
  HeroHeader: {
    category: 'Layout', description: 'Page-level hero: eyebrow, headline, subtext, CTA slot.',
    path: 'components/layout/HeroHeader.tsx',
    props: [
      { name: 'eyebrow', type: 'string' }, { name: 'headline', type: 'string', required: true },
      { name: 'sub', type: 'string' }, { name: 'actions', type: 'ReactNode' },
    ],
    spec: { 'Headline size': 'clamp(2rem,5vw,3.5rem)', 'Letter spacing': '-0.02em' },
  },
  SuggestionPanel: {
    category: 'Layout', description: 'Floating panel of AI-generated quick-action suggestions.',
    path: 'components/layout/SuggestionPanel.tsx',
    props: [
      { name: 'suggestions', type: 'Suggestion[]', required: true },
      { name: 'onSelect', type: '(s: Suggestion) => void' },
    ],
    spec: { 'Width': '320px', 'Radius': 'rounded-2xl', 'Background': 'surface-primary + shadow-md' },
  },
  BrandAuditGrid: {
    category: 'Layout', description: 'Grid layout for brand audit results — score cards and issue lists.',
    path: 'components/brand-audit/BrandAuditGrid.tsx',
    spec: { 'Columns': 'repeat(3, 1fr) on desktop', 'Card radius': 'rounded-2xl' },
  },
  AnimatedBeam: {
    category: 'Effects', description: 'SVG beam that animates along a path between two ref elements.',
    path: 'components/ui/animated-beam/AnimatedBeam.tsx',
    props: [
      { name: 'containerRef', type: 'RefObject<HTMLElement>', required: true },
      { name: 'fromRef', type: 'RefObject<HTMLElement>', required: true },
      { name: 'toRef', type: 'RefObject<HTMLElement>', required: true },
      { name: 'curvature', type: 'number', default: '0' },
      { name: 'duration', type: 'number', default: '5' },
    ],
    spec: { 'Stroke': '2px gradient', 'Animation': 'pathLength 0→1 loop', 'Library': 'Framer Motion' },
  },
  BorderBeam: {
    category: 'Effects', description: 'Rotating gradient border beam that travels around a container.',
    path: 'components/ui/border-beam/BorderBeam.tsx',
    props: [
      { name: 'size', type: 'number', default: '200' }, { name: 'duration', type: 'number', default: '8' },
      { name: 'colorFrom', type: 'string', default: '#963BF7' }, { name: 'colorTo', type: 'string', default: '#F7621E' },
    ],
    spec: { 'Position': 'absolute inset-0', 'Overflow': 'hidden (parent)', 'Library': 'Framer Motion' },
  },
};

// ─── Sub-components ────────────────────────────────────────────────────────────

const btn = (label: string, bg: string, color = '#fff', border?: string) => (
  <div key={label} style={{ padding: '8px 18px', borderRadius: '8px', background: bg, color, border: border || 'none', fontSize: '13px', fontWeight: 600, fontFamily: 'inherit', cursor: 'default', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>{label}</div>
);

const COMPONENT_PREVIEWS: Record<string, React.ReactNode> = {
  Button: <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
    {btn('Primary', 'var(--brand-primary-500)')}
    {btn('Secondary', 'transparent', 'var(--color-text-body)', '1px solid var(--color-border-primary)')}
    {btn('Purple', 'var(--brand-secondary-500)')}
    {btn('Ghost', 'transparent', 'var(--brand-primary-500)')}
  </div>,

  ButtonPill: <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
    {[['Save', 'var(--brand-primary-500)'], ['Cancel', 'transparent', 'var(--color-text-body)', '1px solid var(--color-border-primary)'], ['Share', 'var(--brand-secondary-500)']].map(([l, bg, c, b]: any) => (
      <div key={l} style={{ padding: '7px 20px', borderRadius: '999px', background: bg, color: c || '#fff', border: b || 'none', fontSize: '13px', fontWeight: 600, cursor: 'default' }}>{l}</div>
    ))}
  </div>,

  ButtonRounded: <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
    {[['Add', 'var(--brand-primary-500)'], ['Edit', 'var(--neutral-50)', 'var(--color-text-body)', '1px solid var(--color-border-primary)']].map(([l, bg, c, b]: any) => (
      <div key={l} style={{ padding: '8px 20px', borderRadius: '14px', background: bg, color: c || '#fff', border: b || 'none', fontSize: '13px', fontWeight: 600, cursor: 'default' }}>{l}</div>
    ))}
  </div>,

  BrandCheckbox: <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    {[['Enable notifications', true], ['Auto-save drafts', true], ['Dark mode', false]].map(([label, checked]: any) => (
      <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '18px', height: '18px', borderRadius: '5px', background: checked ? 'var(--brand-primary-500)' : 'transparent', border: checked ? 'none' : '2px solid var(--color-border-primary)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {checked && <span style={{ color: '#fff', fontSize: '11px', lineHeight: 1 }}>✓</span>}
        </div>
        <span style={{ fontSize: '13px', color: 'var(--color-text-body)' }}>{label}</span>
      </div>
    ))}
  </div>,

  Input: <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '320px' }}>
    <div style={{ border: '1.5px solid var(--color-border-primary)', borderRadius: '10px', padding: '10px 14px', fontSize: '14px', color: 'var(--color-text-body)', background: 'var(--color-surface-primary)' }}>Search agents...</div>
    <div style={{ border: '1.5px solid var(--brand-primary-500)', borderRadius: '10px', padding: '10px 14px', fontSize: '14px', color: 'var(--color-text-heading)', background: 'var(--color-surface-primary)' }}>john@agency.com</div>
  </div>,

  Slider: <div style={{ width: '100%', maxWidth: '280px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
    {[65, 30].map((val, i) => (
      <div key={i} style={{ position: 'relative', height: '4px', background: 'var(--color-border-primary)', borderRadius: '2px' }}>
        <div style={{ position: 'absolute', left: 0, width: `${val}%`, height: '100%', background: 'var(--brand-primary-500)', borderRadius: '2px' }} />
        <div style={{ position: 'absolute', left: `${val}%`, top: '50%', transform: 'translate(-50%,-50%)', width: '16px', height: '16px', borderRadius: '50%', background: 'var(--brand-primary-500)', border: '2px solid #fff', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
      </div>
    ))}
  </div>,

  Badge: <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
    {[['Active', '#d1fae5', '#065f46'], ['Pending', '#fef3c7', '#92400e'], ['Error', '#fee2e2', '#991b1b'], ['Draft', 'var(--neutral-50)', 'var(--neutral-700)', '1px solid var(--color-border-primary)']].map(([l, bg, c, b]: any) => (
      <div key={l} style={{ padding: '3px 10px', borderRadius: '999px', background: bg, color: c, border: b, fontSize: '11px', fontWeight: 600 }}>{l}</div>
    ))}
  </div>,

  Avatar: <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
    {[['JD', 'var(--brand-primary-500)'], ['AK', 'var(--brand-secondary-500)'], ['MR', '#0ea5e9']].map(([init, bg]: any) => (
      <div key={init} style={{ width: '40px', height: '40px', borderRadius: '50%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '13px', fontWeight: 700 }}>{init}</div>
    ))}
  </div>,

  CollaboratorAvatar: <div style={{ display: 'flex' }}>
    {[['JD', 'var(--brand-primary-500)'], ['AK', 'var(--brand-secondary-500)'], ['MR', '#0ea5e9'], ['+4', 'var(--neutral-50)', 'var(--neutral-700)', '1px solid var(--color-border-primary)']].map(([init, bg, c, b]: any, i) => (
      <div key={i} style={{ width: '36px', height: '36px', borderRadius: '50%', background: bg, border: b || '2px solid #fff', marginLeft: i > 0 ? '-10px' : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c || '#fff', fontSize: '11px', fontWeight: 700, zIndex: 4 - i, position: 'relative' }}>{init}</div>
    ))}
  </div>,

  AIBubble: <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '340px' }}>
    <div style={{ alignSelf: 'flex-start', background: 'var(--neutral-50)', border: '1px solid var(--color-border-primary)', borderRadius: '4px 16px 16px 16px', padding: '10px 14px', fontSize: '13px', color: 'var(--color-text-body)', maxWidth: '80%' }}>
      I've analysed the campaign data and identified 3 key opportunities.
    </div>
    <div style={{ alignSelf: 'flex-start', background: 'var(--neutral-50)', border: '1px solid var(--color-border-primary)', borderRadius: '4px 16px 16px 16px', padding: '10px 14px', fontSize: '13px', color: 'var(--color-text-body)', maxWidth: '70%', display: 'flex', gap: '6px', alignItems: 'center' }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--brand-secondary-500)', display: 'inline-block' }} />
      <span style={{ color: 'var(--neutral-400)', fontSize: '11px' }}>AI is thinking…</span>
    </div>
  </div>,

  UserBubble: <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '340px' }}>
    <div style={{ alignSelf: 'flex-end', background: 'var(--brand-primary-500)', borderRadius: '16px 4px 16px 16px', padding: '10px 14px', fontSize: '13px', color: '#fff', maxWidth: '80%' }}>
      Can you pull last week's report?
    </div>
    <div style={{ alignSelf: 'flex-end', background: 'var(--brand-primary-500)', borderRadius: '16px 4px 16px 16px', padding: '10px 14px', fontSize: '13px', color: '#fff', maxWidth: '60%' }}>
      Thanks!
    </div>
  </div>,

  AIStatusBar: <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '320px' }}>
    {[['Analysing data…', 'var(--brand-secondary-500)'], ['Running workflow…', 'var(--brand-primary-500)'], ['Complete', '#10b981']].map(([label, col]: any) => (
      <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '10px', background: 'var(--neutral-50)', border: '1px solid var(--color-border-primary)' }}>
        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: col, flexShrink: 0 }} />
        <span style={{ fontSize: '12px', color: 'var(--color-text-body)' }}>{label}</span>
      </div>
    ))}
  </div>,

  Composer: <div style={{ width: '100%', maxWidth: '360px', border: '1.5px solid var(--color-border-primary)', borderRadius: '14px', background: 'var(--color-surface-primary)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
    <span style={{ flex: 1, fontSize: '13px', color: 'var(--neutral-400)' }}>Ask your AI agent…</span>
    <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'var(--brand-primary-500)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ color: '#fff', fontSize: '13px' }}>↑</span>
    </div>
  </div>,

  AgentLoader: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
    <div style={{ display: 'flex', gap: '6px' }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: i === 1 ? 'var(--brand-primary-500)' : 'var(--brand-secondary-500)', opacity: i === 1 ? 1 : 0.4 }} />
      ))}
    </div>
    <span style={{ fontSize: '11px', color: 'var(--neutral-400)', fontFamily: 'monospace' }}>Agent running</span>
  </div>,

  ChatBox: <div style={{ width: '100%', maxWidth: '320px', border: '1px solid var(--color-border-primary)', borderRadius: '16px', overflow: 'hidden', background: 'var(--color-surface-primary)' }}>
    <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--color-border-primary)', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-heading)', display: 'flex', alignItems: 'center', gap: '6px' }}>
      <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981' }} />
      Support Agent
    </div>
    <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ alignSelf: 'flex-start', background: 'var(--neutral-50)', border: '1px solid var(--color-border-primary)', borderRadius: '4px 12px 12px 12px', padding: '7px 12px', fontSize: '12px', color: 'var(--color-text-body)', maxWidth: '85%' }}>Hi! How can I help?</div>
      <div style={{ alignSelf: 'flex-end', background: 'var(--brand-primary-500)', borderRadius: '12px 4px 12px 12px', padding: '7px 12px', fontSize: '12px', color: '#fff' }}>I need a report.</div>
    </div>
    <div style={{ padding: '8px 12px', borderTop: '1px solid var(--color-border-primary)', display: 'flex', gap: '8px', alignItems: 'center' }}>
      <div style={{ flex: 1, background: 'var(--neutral-50)', border: '1px solid var(--color-border-primary)', borderRadius: '8px', padding: '6px 10px', fontSize: '11px', color: 'var(--neutral-400)' }}>Message…</div>
      <div style={{ width: '26px', height: '26px', borderRadius: '7px', background: 'var(--brand-primary-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px' }}>↑</div>
    </div>
  </div>,

  SideChat: <div style={{ display: 'flex', width: '100%', maxWidth: '360px', height: '160px', border: '1px solid var(--color-border-primary)', borderRadius: '16px', overflow: 'hidden' }}>
    <div style={{ width: '120px', borderRight: '1px solid var(--color-border-primary)', background: 'var(--neutral-50)', padding: '10px 0', display: 'flex', flexDirection: 'column', gap: '2px' }}>
      {['All', 'Support', 'Sales', 'Creative'].map((t, i) => (
        <div key={t} style={{ padding: '6px 12px', fontSize: '11px', color: i === 0 ? 'var(--brand-primary-500)' : 'var(--color-text-body)', background: i === 0 ? 'var(--brand-primary-25)' : 'transparent', fontWeight: i === 0 ? 600 : 400 }}>{t}</div>
      ))}
    </div>
    <div style={{ flex: 1, padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--neutral-400)', fontSize: '11px' }}>Select a thread</div>
  </div>,

  GeminiEmptyState: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '16px' }}>
    <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, var(--brand-primary-25), var(--brand-secondary-25))', border: '1px solid var(--color-border-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>✦</div>
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-heading)' }}>Start a conversation</div>
      <div style={{ fontSize: '12px', color: 'var(--neutral-400)', marginTop: '4px' }}>Ask anything about your agency</div>
    </div>
  </div>,

  Card: <div style={{ width: '100%', maxWidth: '280px', border: '1px solid var(--color-border-primary)', borderRadius: '16px', padding: '16px', background: 'rgba(255,255,255,0.92)' }}>
    <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: 'var(--brand-primary-25)', marginBottom: '10px' }} />
    <div style={{ height: '12px', background: 'var(--neutral-100)', borderRadius: '4px', marginBottom: '6px', width: '70%' }} />
    <div style={{ height: '10px', background: 'var(--neutral-50)', borderRadius: '4px', marginBottom: '4px' }} />
    <div style={{ height: '10px', background: 'var(--neutral-50)', borderRadius: '4px', width: '80%' }} />
  </div>,

  GlassMetricCard: <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
    {[['$128k', 'Revenue', '+12%'], ['94%', 'CSAT', '+3%']].map(([val, label, diff]: any) => (
      <div key={label} style={{ padding: '16px 20px', borderRadius: '16px', background: 'rgba(255,255,255,0.92)', border: '1px solid var(--color-border-primary)', backdropFilter: 'blur(8px)', minWidth: '120px' }}>
        <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-text-heading)', letterSpacing: '-0.03em' }}>{val}</div>
        <div style={{ fontSize: '11px', color: 'var(--neutral-400)', marginTop: '2px' }}>{label}</div>
        <div style={{ fontSize: '11px', color: '#10b981', marginTop: '4px', fontWeight: 600 }}>{diff}</div>
      </div>
    ))}
  </div>,

  GlassActionCard: <div style={{ padding: '18px 20px', borderRadius: '16px', background: 'rgba(255,255,255,0.92)', border: '1px solid var(--color-border-primary)', maxWidth: '240px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-heading)' }}>Review Report</div>
    <div style={{ fontSize: '12px', color: 'var(--neutral-400)', lineHeight: 1.5 }}>Monthly performance summary is ready for review.</div>
    <div style={{ padding: '7px 14px', borderRadius: '8px', background: 'var(--brand-primary-500)', color: '#fff', fontSize: '12px', fontWeight: 600, alignSelf: 'flex-start', cursor: 'default' }}>View Report</div>
  </div>,

  DescriptionCard: <div style={{ padding: '18px 20px', borderRadius: '16px', background: 'rgba(255,255,255,0.92)', border: '1px solid var(--color-border-primary)', maxWidth: '280px' }}>
    <div style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--brand-secondary-500)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Lead Qualification</div>
    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-heading)', marginBottom: '6px' }}>Qualify inbound leads automatically</div>
    <div style={{ fontSize: '12px', color: 'var(--neutral-400)', lineHeight: 1.5 }}>AI agent scores and routes leads based on fit criteria.</div>
  </div>,

  CampaignListCard: <div style={{ width: '100%', maxWidth: '300px', border: '1px solid var(--color-border-primary)', borderRadius: '14px', overflow: 'hidden', background: 'rgba(255,255,255,0.92)' }}>
    {[['Spring Launch', 'Active', '#10b981'], ['Q2 Retargeting', 'Pending', '#f59e0b'], ['Brand Awareness', 'Draft', 'var(--neutral-400)']].map(([name, status, col]: any) => (
      <div key={name} style={{ padding: '10px 14px', borderBottom: '1px solid var(--color-border-primary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '12px', color: 'var(--color-text-body)', fontWeight: 500 }}>{name}</span>
        <div style={{ padding: '2px 8px', borderRadius: '999px', background: col + '20', color: col, fontSize: '10px', fontWeight: 600 }}>{status}</div>
      </div>
    ))}
  </div>,

  EmailPreviewCard: <div style={{ width: '100%', maxWidth: '300px', border: '1px solid var(--color-border-primary)', borderRadius: '14px', overflow: 'hidden', background: 'rgba(255,255,255,0.92)' }}>
    <div style={{ background: 'var(--neutral-900)', padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', gap: '6px' }}>
        {['#ef4444', '#eab308', '#22c55e'].map(c => <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />)}
      </div>
      <div style={{ width: '120px', height: '8px', background: 'rgba(255,255,255,0.15)', borderRadius: '4px' }} />
    </div>
    <div style={{ padding: '16px' }}>
      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-heading)', marginBottom: '4px' }}>Your monthly report is ready</div>
      <div style={{ fontSize: '11px', color: 'var(--neutral-400)', marginBottom: '10px' }}>from reports@agency.com</div>
      <div style={{ height: '8px', background: 'var(--neutral-50)', borderRadius: '4px', marginBottom: '6px' }} />
      <div style={{ height: '8px', background: 'var(--neutral-50)', borderRadius: '4px', width: '75%' }} />
    </div>
  </div>,

  InstagramPreviewCard: <div style={{ width: '180px', border: '1px solid var(--color-border-primary)', borderRadius: '14px', overflow: 'hidden', background: 'rgba(255,255,255,0.92)' }}>
    <div style={{ padding: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(45deg, #f9a825, #e91e63)' }} />
      <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-heading)' }}>your_agency</span>
    </div>
    <div style={{ height: '120px', background: 'linear-gradient(135deg, #667eea, #764ba2)' }} />
    <div style={{ padding: '10px' }}>
      <div style={{ height: '8px', background: 'var(--neutral-50)', borderRadius: '4px', marginBottom: '5px', width: '80%' }} />
      <div style={{ height: '8px', background: 'var(--neutral-50)', borderRadius: '4px', width: '60%' }} />
    </div>
  </div>,

  FacebookPreviewCard: <div style={{ width: '260px', border: '1px solid var(--color-border-primary)', borderRadius: '14px', overflow: 'hidden', background: 'rgba(255,255,255,0.92)' }}>
    <div style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1877f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '14px', fontWeight: 700 }}>f</div>
      <div><div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-heading)' }}>Agency Page</div><div style={{ fontSize: '10px', color: 'var(--neutral-400)' }}>Sponsored</div></div>
    </div>
    <div style={{ height: '100px', background: 'linear-gradient(135deg, #1877f2, #42b72a)' }} />
    <div style={{ padding: '12px' }}>
      <div style={{ height: '8px', background: 'var(--neutral-50)', borderRadius: '4px', marginBottom: '5px' }} />
      <div style={{ height: '8px', background: 'var(--neutral-50)', borderRadius: '4px', width: '70%' }} />
    </div>
  </div>,

  GoogleBusinessPreviewCard: <div style={{ width: '260px', border: '1px solid var(--color-border-primary)', borderRadius: '14px', padding: '16px', background: 'rgba(255,255,255,0.92)' }}>
    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#4285f4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '18px', fontWeight: 700 }}>G</div>
      <div>
        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-heading)' }}>Agency Name</div>
        <div style={{ fontSize: '11px', color: 'var(--neutral-400)', marginTop: '2px' }}>Marketing Agency · Open</div>
        <div style={{ fontSize: '11px', color: '#f59e0b', marginTop: '3px' }}>★★★★☆ 4.8 (120)</div>
      </div>
    </div>
  </div>,

  PreviewSlider: <div style={{ width: '100%', maxWidth: '280px' }}>
    <div style={{ position: 'relative', height: '120px', borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{ height: '100%', background: 'linear-gradient(135deg, var(--brand-primary-25), var(--brand-secondary-25))' }} />
      <div style={{ position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '5px' }}>
        {[true, false, false].map((a, i) => <div key={i} style={{ width: a ? '18px' : '6px', height: '6px', borderRadius: '3px', background: a ? 'var(--brand-primary-500)' : 'rgba(255,255,255,0.5)' }} />)}
      </div>
    </div>
  </div>,

  KommerceSidebarNav: <div style={{ width: '160px', border: '1px solid var(--color-border-primary)', borderRadius: '14px', overflow: 'hidden', background: 'var(--neutral-50)' }}>
    {[['◉', 'Dashboard', true], ['☰', 'Campaigns', false], ['✦', 'AI Agents', false], ['⊞', 'Reports', false]].map(([icon, label, active]: any) => (
      <div key={label} style={{ padding: '9px 14px', display: 'flex', alignItems: 'center', gap: '8px', background: active ? 'var(--brand-primary-25)' : 'transparent', borderBottom: '1px solid var(--color-border-primary)' }}>
        <span style={{ fontSize: '13px', color: active ? 'var(--brand-primary-500)' : 'var(--neutral-400)' }}>{icon}</span>
        <span style={{ fontSize: '12px', fontWeight: active ? 600 : 400, color: active ? 'var(--brand-primary-500)' : 'var(--color-text-body)' }}>{label}</span>
      </div>
    ))}
  </div>,

  KommerceTabNav: <div style={{ display: 'flex', gap: '4px', padding: '4px', background: 'var(--neutral-50)', borderRadius: '12px', border: '1px solid var(--color-border-primary)' }}>
    {[['Overview', true], ['Campaigns', false], ['Reports', false]].map(([label, active]: any) => (
      <div key={label} style={{ padding: '7px 16px', borderRadius: '8px', background: active ? '#fff' : 'transparent', fontSize: '12px', fontWeight: active ? 600 : 400, color: active ? 'var(--color-text-heading)' : 'var(--neutral-400)', boxShadow: active ? '0 1px 4px rgba(0,0,0,0.08)' : 'none', cursor: 'default' }}>{label}</div>
    ))}
  </div>,

  TopBar: <div style={{ width: '100%', maxWidth: '360px', height: '48px', border: '1px solid var(--color-border-primary)', borderRadius: '12px', background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', padding: '0 14px', gap: '10px' }}>
    <div style={{ width: '24px', height: '24px', borderRadius: '7px', background: 'var(--brand-primary-25)' }} />
    <div style={{ flex: 1, height: '8px', background: 'var(--neutral-50)', borderRadius: '4px', maxWidth: '120px' }} />
    <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', alignItems: 'center' }}>
      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--brand-secondary-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '11px', fontWeight: 700 }}>JD</div>
    </div>
  </div>,

  SpotlightSearch: <div style={{ width: '100%', maxWidth: '340px', border: '1px solid var(--color-border-primary)', borderRadius: '16px', overflow: 'hidden', background: 'rgba(255,255,255,0.96)', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
    <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--color-border-primary)' }}>
      <span style={{ fontSize: '14px', color: 'var(--neutral-400)' }}>⌕</span>
      <span style={{ fontSize: '13px', color: 'var(--neutral-400)' }}>Search anything…</span>
    </div>
    {[['Campaign Report — Q2', 'Document'], ['Lead: Acme Corp', 'CRM'], ['Support Agent', 'Agent']].map(([label, type]: any) => (
      <div key={label} style={{ padding: '9px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-primary)' }}>
        <span style={{ fontSize: '12px', color: 'var(--color-text-body)' }}>{label}</span>
        <span style={{ fontSize: '10px', color: 'var(--neutral-400)', fontFamily: 'monospace' }}>{type}</span>
      </div>
    ))}
  </div>,

  Dialog: <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)', borderRadius: '16px' }} />
    <div style={{ position: 'relative', margin: '16px', border: '1px solid var(--color-border-primary)', borderRadius: '16px', background: 'rgba(255,255,255,0.98)', padding: '20px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
      <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-heading)', marginBottom: '6px' }}>Confirm Action</div>
      <div style={{ fontSize: '12px', color: 'var(--neutral-400)', marginBottom: '16px', lineHeight: 1.5 }}>This will archive the selected workflow. Continue?</div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <div style={{ padding: '7px 14px', borderRadius: '8px', border: '1px solid var(--color-border-primary)', fontSize: '12px', cursor: 'default', color: 'var(--color-text-body)' }}>Cancel</div>
        <div style={{ padding: '7px 14px', borderRadius: '8px', background: 'var(--brand-primary-500)', fontSize: '12px', cursor: 'default', color: '#fff', fontWeight: 600 }}>Confirm</div>
      </div>
    </div>
  </div>,

  Toast: <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    {[['Workflow saved', '✓', '#10b981', '#d1fae5'], ['Error syncing', '✕', '#ef4444', '#fee2e2']].map(([msg, icon, col, bg]: any) => (
      <div key={msg} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '12px', background: bg, border: `1px solid ${col}30`, minWidth: '220px' }}>
        <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: col, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '10px', flexShrink: 0 }}>{icon}</div>
        <span style={{ fontSize: '12px', color: 'var(--color-text-body)', fontWeight: 500 }}>{msg}</span>
      </div>
    ))}
  </div>,

  ToastContainer: <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
    {[['Saved', '#10b981', '#d1fae5'], ['2 tasks queued', '#f59e0b', '#fef3c7'], ['Agent running', 'var(--brand-secondary-500)', 'var(--brand-secondary-25)']].map(([msg, col, bg]: any) => (
      <div key={msg} style={{ padding: '8px 14px', borderRadius: '10px', background: bg, fontSize: '11px', fontWeight: 500, color: 'var(--color-text-body)', border: `1px solid ${col}30` }}>{msg}</div>
    ))}
  </div>,

  Tooltip: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
    <div style={{ padding: '6px 12px', borderRadius: '8px', background: 'var(--neutral-900)', color: '#fff', fontSize: '11px', fontWeight: 500, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>Export as PDF</div>
    <div style={{ width: '8px', height: '8px', background: 'var(--neutral-900)', transform: 'rotate(45deg)', marginTop: '-10px' }} />
    <div style={{ padding: '8px 16px', borderRadius: '9px', border: '1px solid var(--color-border-primary)', background: 'var(--color-surface-primary)', fontSize: '12px', color: 'var(--color-text-body)', cursor: 'default' }}>Export</div>
  </div>,

  Skeleton: <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '280px' }}>
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--neutral-100)', flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ height: '10px', background: 'var(--neutral-100)', borderRadius: '4px', marginBottom: '6px', width: '60%' }} />
        <div style={{ height: '8px', background: 'var(--neutral-50)', borderRadius: '4px', width: '80%' }} />
      </div>
    </div>
    <div style={{ height: '8px', background: 'var(--neutral-100)', borderRadius: '4px' }} />
    <div style={{ height: '8px', background: 'var(--neutral-50)', borderRadius: '4px', width: '75%' }} />
    <div style={{ height: '8px', background: 'var(--neutral-50)', borderRadius: '4px', width: '55%' }} />
  </div>,

  PageLoader: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
    <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid var(--neutral-100)', borderTop: '3px solid var(--brand-primary-500)' }} />
    <span style={{ fontSize: '12px', color: 'var(--neutral-400)', fontFamily: 'monospace' }}>Loading workspace…</span>
  </div>,

  ShimmerImage: <div style={{ width: '200px', height: '120px', borderRadius: '12px', background: 'linear-gradient(90deg, var(--neutral-50) 25%, var(--neutral-100) 50%, var(--neutral-50) 75%)', backgroundSize: '200% 100%' }} />,

  Table: <div style={{ width: '100%', maxWidth: '360px', border: '1px solid var(--color-border-primary)', borderRadius: '12px', overflow: 'hidden' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: 'var(--neutral-50)', borderBottom: '1px solid var(--color-border-primary)' }}>
      {['Name', 'Status', 'Value'].map(h => <div key={h} style={{ padding: '8px 12px', fontSize: '10px', fontWeight: 700, color: 'var(--neutral-400)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</div>)}
    </div>
    {[['Campaign A', 'Active', '$4.2k'], ['Campaign B', 'Paused', '$1.8k'], ['Campaign C', 'Draft', '$0']].map(([n, s, v]: any) => (
      <div key={n} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: '1px solid var(--color-border-primary)' }}>
        <div style={{ padding: '9px 12px', fontSize: '12px', color: 'var(--color-text-heading)', fontWeight: 500 }}>{n}</div>
        <div style={{ padding: '9px 12px' }}><span style={{ fontSize: '10px', padding: '2px 7px', borderRadius: '999px', background: s === 'Active' ? '#d1fae520' : 'var(--neutral-50)', color: s === 'Active' ? '#065f46' : 'var(--neutral-400)', border: '1px solid var(--color-border-primary)' }}>{s}</span></div>
        <div style={{ padding: '9px 12px', fontSize: '12px', color: 'var(--color-text-body)', fontFamily: 'monospace' }}>{v}</div>
      </div>
    ))}
  </div>,

  Collapsible: <div style={{ width: '100%', maxWidth: '300px', border: '1px solid var(--color-border-primary)', borderRadius: '12px', overflow: 'hidden' }}>
    {[['Workflow Settings', true], ['Advanced Options', false], ['Integrations', false]].map(([label, open]: any) => (
      <div key={label} style={{ borderBottom: '1px solid var(--color-border-primary)' }}>
        <div style={{ padding: '11px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: open ? 'var(--brand-primary-25)' : 'transparent', cursor: 'default' }}>
          <span style={{ fontSize: '12px', fontWeight: open ? 600 : 400, color: open ? 'var(--brand-primary-500)' : 'var(--color-text-body)' }}>{label}</span>
          <span style={{ fontSize: '12px', color: 'var(--neutral-400)', transform: open ? 'rotate(180deg)' : 'none', display: 'inline-block' }}>▾</span>
        </div>
        {open && <div style={{ padding: '10px 14px', background: 'var(--neutral-50)', borderTop: '1px solid var(--color-border-primary)' }}>
          <div style={{ height: '8px', background: 'var(--neutral-100)', borderRadius: '4px', marginBottom: '5px', width: '80%' }} />
          <div style={{ height: '8px', background: 'var(--neutral-100)', borderRadius: '4px', width: '60%' }} />
        </div>}
      </div>
    ))}
  </div>,

  MonthViewCalendar: <div style={{ width: '220px', border: '1px solid var(--color-border-primary)', borderRadius: '14px', overflow: 'hidden', background: 'rgba(255,255,255,0.92)' }}>
    <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--color-border-primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-heading)' }}>May 2026</span>
      <div style={{ display: 'flex', gap: '8px' }}>
        <span style={{ fontSize: '12px', color: 'var(--neutral-400)', cursor: 'default' }}>‹</span>
        <span style={{ fontSize: '12px', color: 'var(--neutral-400)', cursor: 'default' }}>›</span>
      </div>
    </div>
    <div style={{ padding: '8px', display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
      {['M','T','W','T','F','S','S'].map((d, i) => <div key={i} style={{ textAlign: 'center', fontSize: '9px', color: 'var(--neutral-400)', fontWeight: 600, padding: '2px 0' }}>{d}</div>)}
      {Array.from({ length: 31 }, (_, i) => (
        <div key={i} style={{ textAlign: 'center', fontSize: '10px', padding: '3px 2px', borderRadius: '5px', background: i === 16 ? 'var(--brand-primary-500)' : 'transparent', color: i === 16 ? '#fff' : 'var(--color-text-body)', fontWeight: i === 16 ? 700 : 400 }}>{i + 1}</div>
      ))}
    </div>
  </div>,

  TimelineCard: <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
    {[['Lead created', '9:00 AM', 'var(--brand-primary-500)'], ['Assigned to agent', '9:05 AM', 'var(--brand-secondary-500)'], ['Email sent', '9:10 AM', '#10b981'], ['Meeting booked', '9:30 AM', '#f59e0b']].map(([label, time, col]: any, i, arr) => (
      <div key={label} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: col, flexShrink: 0, marginTop: '3px' }} />
          {i < arr.length - 1 && <div style={{ width: '2px', flex: 1, background: 'var(--color-border-primary)', minHeight: '22px' }} />}
        </div>
        <div style={{ paddingBottom: '12px' }}>
          <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-text-heading)' }}>{label}</div>
          <div style={{ fontSize: '10px', color: 'var(--neutral-400)', fontFamily: 'monospace' }}>{time}</div>
        </div>
      </div>
    ))}
  </div>,

  TimelineDot: <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
    {[['var(--brand-primary-500)', 'Done'], ['var(--brand-secondary-500)', 'In Progress'], ['var(--neutral-100)', 'Pending']].map(([col, label]: any) => (
      <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
        <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: col, border: col === 'var(--neutral-100)' ? '2px solid var(--color-border-primary)' : 'none' }} />
        <span style={{ fontSize: '9px', color: 'var(--neutral-400)', fontFamily: 'monospace' }}>{label}</span>
      </div>
    ))}
  </div>,

  InteractiveTags: <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
    {[['AI Agents', true], ['Workflows', true], ['Reports', false], ['+ Add tag', false]].map(([label, active]: any) => (
      <div key={label} style={{ padding: '5px 12px', borderRadius: '999px', background: active ? 'var(--brand-secondary-25)' : 'var(--neutral-50)', color: active ? 'var(--brand-secondary-500)' : 'var(--neutral-400)', border: `1px solid ${active ? 'var(--brand-secondary-500)' : 'var(--color-border-primary)'}30`, fontSize: '11px', fontWeight: active ? 600 : 400, cursor: 'default' }}>{label}</div>
    ))}
  </div>,

  StaticTags: <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
    {[['Agency', 'var(--brand-primary-25)', 'var(--brand-primary-500)'], ['AI-Native', 'var(--brand-secondary-25)', 'var(--brand-secondary-500)'], ['SaaS', '#d1fae5', '#065f46'], ['B2B', '#fef3c7', '#92400e']].map(([label, bg, col]: any) => (
      <div key={label} style={{ padding: '4px 10px', borderRadius: '999px', background: bg, color: col, fontSize: '11px', fontWeight: 600 }}>{label}</div>
    ))}
  </div>,

  AppLayout: <div style={{ width: '100%', maxWidth: '300px', height: '160px', border: '1px solid var(--color-border-primary)', borderRadius: '14px', overflow: 'hidden', display: 'flex' }}>
    <div style={{ width: '60px', background: 'var(--neutral-50)', borderRight: '1px solid var(--color-border-primary)', display: 'flex', flexDirection: 'column', gap: '10px', padding: '12px 8px' }}>
      {[1, 2, 3, 4].map(i => <div key={i} style={{ width: '28px', height: '28px', borderRadius: '8px', background: i === 1 ? 'var(--brand-primary-25)' : 'var(--neutral-100)' }} />)}
    </div>
    <div style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ height: '10px', background: 'var(--neutral-100)', borderRadius: '4px', width: '60%' }} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', flex: 1 }}>
        {[1, 2, 3, 4].map(i => <div key={i} style={{ background: 'var(--neutral-50)', borderRadius: '8px', border: '1px solid var(--color-border-primary)' }} />)}
      </div>
    </div>
  </div>,

  BentoGrid: <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: 'auto auto', gap: '8px', width: '100%', maxWidth: '280px' }}>
    <div style={{ gridColumn: 'span 2', height: '70px', borderRadius: '12px', background: 'var(--brand-primary-25)', border: '1px solid var(--color-border-primary)' }} />
    <div style={{ height: '70px', borderRadius: '12px', background: 'var(--brand-secondary-25)', border: '1px solid var(--color-border-primary)' }} />
    <div style={{ height: '60px', borderRadius: '12px', background: 'var(--neutral-50)', border: '1px solid var(--color-border-primary)' }} />
    <div style={{ gridColumn: 'span 2', height: '60px', borderRadius: '12px', background: 'var(--neutral-50)', border: '1px solid var(--color-border-primary)' }} />
  </div>,

  HeroHeader: <div style={{ width: '100%', maxWidth: '340px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '16px' }}>
    <div style={{ padding: '4px 12px', borderRadius: '999px', background: 'var(--brand-primary-25)', color: 'var(--brand-primary-500)', fontSize: '10px', fontWeight: 600 }}>New · AI Agents v2</div>
    <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-text-heading)', lineHeight: 1.15, letterSpacing: '-0.03em' }}>Build smarter<br />workflows faster</div>
    <div style={{ fontSize: '12px', color: 'var(--neutral-400)', maxWidth: '240px', lineHeight: 1.5 }}>AI-native tools for modern agencies.</div>
    <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
      <div style={{ padding: '8px 16px', borderRadius: '9px', background: 'var(--brand-primary-500)', color: '#fff', fontSize: '12px', fontWeight: 600 }}>Get started</div>
      <div style={{ padding: '8px 16px', borderRadius: '9px', border: '1px solid var(--color-border-primary)', fontSize: '12px', color: 'var(--color-text-body)' }}>Learn more</div>
    </div>
  </div>,

  SuggestionPanel: <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%', maxWidth: '300px' }}>
    <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--neutral-400)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>Suggestions</div>
    {['Generate Q2 performance report', 'Summarise open support tickets', 'Review pending deliverables'].map(s => (
      <div key={s} style={{ padding: '10px 14px', borderRadius: '12px', background: 'var(--neutral-50)', border: '1px solid var(--color-border-primary)', fontSize: '12px', color: 'var(--color-text-body)', cursor: 'default', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: 'var(--brand-secondary-500)', fontSize: '13px' }}>✦</span>{s}
      </div>
    ))}
  </div>,

  BrandAuditGrid: <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', width: '100%', maxWidth: '280px' }}>
    {[['Logo', '✓', '#10b981'], ['Typography', '✓', '#10b981'], ['Colours', '⚠', '#f59e0b'], ['Imagery', '✕', '#ef4444']].map(([label, icon, col]: any) => (
      <div key={label} style={{ padding: '12px', borderRadius: '12px', background: 'rgba(255,255,255,0.92)', border: '1px solid var(--color-border-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: col + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: col, flexShrink: 0 }}>{icon}</div>
        <span style={{ fontSize: '11px', color: 'var(--color-text-body)', fontWeight: 500 }}>{label}</span>
      </div>
    ))}
  </div>,

  AnimatedBeam: <div style={{ position: 'relative', width: '200px', height: '80px', borderRadius: '16px', border: '2px solid transparent', background: 'linear-gradient(var(--color-surface-primary), var(--color-surface-primary)) padding-box, linear-gradient(90deg, var(--brand-primary-500), var(--brand-secondary-500), var(--brand-primary-500)) border-box', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <span style={{ fontSize: '12px', color: 'var(--color-text-body)' }}>Animated border beam</span>
  </div>,

  BorderBeam: <div style={{ position: 'relative', width: '200px', height: '80px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--color-border-primary)', background: 'var(--color-surface-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--brand-secondary-500), transparent)' }} />
    <span style={{ fontSize: '12px', color: 'var(--color-text-body)' }}>Border beam effect</span>
  </div>,
};

const ComponentPreview = ({ id }: { id: string }) => {
  const preview = COMPONENT_PREVIEWS[id];
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '140px', padding: '28px 24px', width: '100%' }}>
      {preview ?? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: 'var(--brand-primary-25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '15px' }}>◻</span>
          </div>
          <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--neutral-400)' }}>{id}</span>
        </div>
      )}
    </div>
  );
};

const SpecGrid = ({ spec }: { spec: Record<string, string> }) => (
  <div className="comp-spec-grid">
    {Object.entries(spec).map(([k, v]) => (
      <div key={k} style={{ border: '1px solid var(--color-border-primary)', borderRadius: '12px', padding: '10px 14px', background: 'var(--neutral-25)' }}>
        <div style={{ fontFamily: 'monospace', fontSize: '9.5px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--neutral-400)', marginBottom: '3px' }}>{k}</div>
        <div style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--color-text-heading)', wordBreak: 'break-all' }}>{v}</div>
      </div>
    ))}
  </div>
);

const PropsTable = ({ props }: { props: ComponentSpec['props'] }) => {
  if (!props || props.length === 0) return <div style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--neutral-400)' }}>No documented props.</div>;
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', border: '1px solid var(--color-border-primary)', borderRadius: '14px', overflow: 'hidden' }}>
        <thead style={{ background: 'var(--color-surface-page)' }}>
          <tr>
            {['Prop', 'Type', 'Default'].map(h => (
              <th key={h} style={{ textAlign: 'left', padding: '10px 14px', fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--neutral-400)', fontWeight: 500 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.map(p => (
            <tr key={p.name} style={{ borderTop: '1px solid var(--color-border-primary)' }}>
              <td style={{ padding: '10px 14px' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--color-text-heading)', fontWeight: 500 }}>{p.name}</span>
                {p.required && <span style={{ fontFamily: 'monospace', fontSize: '9px', color: '#ef4444', marginLeft: '4px' }}>required</span>}
              </td>
              <td style={{ padding: '10px 14px' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--brand-secondary-500)', background: 'var(--brand-secondary-25)', padding: '2px 7px', borderRadius: '5px' }}>{p.type}</span>
              </td>
              <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontSize: '12px', color: 'var(--color-text-body)' }}>{p.default || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const CodeBlock = ({ id, component }: { id: string; component: ComponentSpec }) => {
  const [copied, setCopied] = useState(false);
  const variantProps = Object.entries(component.variants || {}).map(([k, list]) => `${k}="${list[0]}"`).join(' ');
  const code = `import { ${id} } from "@/${component.path.replace(/\.tsx$/, '')}";\n\n<${id}${variantProps ? ' ' + variantProps : ''} />`;
  return (
    <div style={{ background: '#0f0f12', color: '#eee', borderRadius: '16px', padding: '18px 20px', fontFamily: 'monospace', fontSize: '12px', lineHeight: 1.7, overflowX: 'auto', position: 'relative', border: '1px solid #1f1f22' }}>
      <button onClick={() => { navigator.clipboard?.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1200); }}
        style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#ccc', fontSize: '10px', padding: '3px 9px', borderRadius: '999px', fontFamily: 'monospace', cursor: 'pointer' }}>
        {copied ? 'copied ✓' : 'copy'}
      </button>
      <div style={{ color: '#6b7280', fontStyle: 'italic' }}>{'// '}{component.path}</div>
      <div><span style={{ color: '#c08afa' }}>import</span>{' { '}<span style={{ color: '#fae549' }}>{id}</span>{' } '}<span style={{ color: '#c08afa' }}>from</span>{' '}<span style={{ color: '#f9814b' }}>"{`@/${component.path.replace(/\.tsx$/, '')}`}"</span>;</div>
      <div>&nbsp;</div>
      <div>{'<'}<span style={{ color: '#fae549' }}>{id}</span>{variantProps ? ' ' + variantProps : ''}{' />'}</div>
    </div>
  );
};

// ─── Exports for sidebar use in App.tsx ───────────────────────────────────────
export { GROUPS, COMPONENTS };

// ─── Main ComponentLibrary (right panel only) ─────────────────────────────────

interface ComponentLibraryProps {
  activeId: string;
}

const OverviewPage = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', minWidth: 0 }}>
    {/* Header */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--brand-secondary-500)', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--brand-secondary-500)' }} />
        Agentive OS · UI Kit
      </div>
      <h1 style={{ margin: 0, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', lineHeight: 1.05, fontWeight: 700, color: 'var(--color-text-heading)', letterSpacing: '-0.02em' }}>Component Library</h1>
      <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.55, color: 'var(--color-text-body)', maxWidth: '560px' }}>
        A collection of {Object.keys(COMPONENTS).length} production-ready components built for the Agentive OS design system. Browse by category or search to find what you need.
      </p>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '10px', background: 'var(--brand-secondary-25)', color: 'var(--brand-secondary-500)', padding: '3px 9px', borderRadius: '999px' }}>{Object.keys(COMPONENTS).length} components</span>
        <span style={{ fontFamily: 'monospace', fontSize: '10px', background: 'var(--color-surface-page)', color: 'var(--color-text-body)', padding: '3px 9px', borderRadius: '999px', border: '1px solid var(--color-border-primary)' }}>{GROUPS.length} groups</span>
        <span style={{ fontFamily: 'monospace', fontSize: '10px', background: 'var(--color-surface-page)', color: 'var(--color-text-body)', padding: '3px 9px', borderRadius: '999px', border: '1px solid var(--color-border-primary)' }}>v1.0</span>
      </div>
    </div>

    {/* Group grid */}
    <div className="comp-overview-grid">
      {GROUPS.map(group => (
        <div key={group.id} style={{ background: 'rgba(255,255,255,0.92)', border: '1px solid var(--color-border-primary)', borderRadius: '16px', padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--neutral-400)' }}>{group.label}</span>
            <span style={{ fontFamily: 'monospace', fontSize: '10px', background: 'var(--color-surface-page)', color: 'var(--neutral-400)', padding: '2px 7px', borderRadius: '999px', border: '1px solid var(--color-border-primary)' }}>{group.ids.length}</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {group.ids.map(id => (
              <span key={id} style={{ fontFamily: 'monospace', fontSize: '10px', background: 'var(--neutral-50)', border: '1px solid var(--color-border-primary)', color: 'var(--color-text-body)', padding: '2px 8px', borderRadius: '6px' }}>{id}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ComponentLibrary: React.FC<ComponentLibraryProps> = ({ activeId }) => {
  const component = COMPONENTS[activeId];
  const group = GROUPS.find(g => g.ids.includes(activeId));
  const totalVariants = component?.variants ? Object.values(component.variants).reduce((a, l) => a * l.length, 1) : null;

  if (activeId === 'overview') {
    return <OverviewPage />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: 0 }}>
      {component ? (
          <div className="comp-detail-card" style={{ background: 'rgba(255,255,255,0.92)', border: '1px solid var(--color-border-primary)', borderRadius: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '28px' }}>

            {/* Hero */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '20px', borderBottom: '1px solid var(--color-border-primary)' }}>
              <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--brand-secondary-500)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--brand-secondary-500)' }} />
                {group?.label || 'Component'} · {component.category}
              </div>
              <h1 style={{ margin: 0, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', lineHeight: 1.05, fontWeight: 700, color: 'var(--color-text-heading)', letterSpacing: '-0.02em' }}>{activeId}</h1>
              <div style={{ fontSize: '15px', lineHeight: 1.55, color: 'var(--color-text-body)', maxWidth: '640px' }}>{component.description}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center', marginTop: '2px' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '10px', background: 'var(--color-surface-page)', color: 'var(--color-text-body)', padding: '3px 9px', borderRadius: '999px', border: '1px solid var(--color-border-primary)' }}>
                  <span style={{ opacity: 0.6, marginRight: '4px' }}>path</span>{component.path}
                </span>
                {component.subComponents && (
                  <span style={{ fontFamily: 'monospace', fontSize: '10px', background: 'var(--brand-secondary-25)', color: 'var(--brand-secondary-500)', padding: '3px 9px', borderRadius: '999px' }}>
                    <span style={{ opacity: 0.6, marginRight: '4px' }}>subcomponents</span>{component.subComponents.join(' · ')}
                  </span>
                )}
                {totalVariants && (
                  <span style={{ fontFamily: 'monospace', fontSize: '10px', background: 'var(--brand-primary-25)', color: 'var(--brand-primary-500)', padding: '3px 9px', borderRadius: '999px' }}>
                    <span style={{ opacity: 0.6, marginRight: '4px' }}>variants</span>{totalVariants} total
                  </span>
                )}
              </div>
              {component.variants && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {Object.entries(component.variants).flatMap(([k, list]) =>
                    list.map(v => (
                      <span key={k + v} style={{ fontFamily: 'monospace', fontSize: '10px', background: 'var(--color-surface-primary)', border: '1px solid var(--color-border-primary)', color: 'var(--color-text-body)', padding: '2px 7px', borderRadius: '5px' }}>{k}={v}</span>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: 'var(--color-text-heading)', letterSpacing: '-0.01em' }}>Preview</h3>
              <div style={{ borderRadius: '20px', border: '1px solid var(--color-border-primary)', background: 'var(--color-surface-page)', backgroundImage: 'radial-gradient(circle at 1px 1px, var(--color-border-primary) 1px, transparent 0)', backgroundSize: '16px 16px', overflow: 'hidden' }}>
                <ComponentPreview id={activeId} />
              </div>
            </div>

            {/* Specs */}
            {component.spec && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: 'var(--color-text-heading)', letterSpacing: '-0.01em' }}>Anatomy &amp; specs</h3>
                  <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--neutral-400)' }}>Tailwind utilities &amp; tokens</span>
                </div>
                <SpecGrid spec={component.spec} />
              </div>
            )}

            {/* Props */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: 'var(--color-text-heading)', letterSpacing: '-0.01em' }}>Props</h3>
              <PropsTable props={component.props} />
            </div>

            {/* Code */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: 'var(--color-text-heading)', letterSpacing: '-0.01em' }}>Import</h3>
              <CodeBlock id={activeId} component={component} />
            </div>

          </div>
        ) : (
          <div style={{ background: 'rgba(255,255,255,0.92)', border: '1px solid var(--color-border-primary)', borderRadius: '24px', padding: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px', color: 'var(--neutral-400)', fontFamily: 'monospace', fontSize: '13px' }}>
            Select a component
          </div>
        )}
    </div>
  );
};

export default ComponentLibrary;
