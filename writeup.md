- https://deepwiki.com/
- https://arc.net/

## 1. Visual Aesthetic
*   **Theming:** Adopt the "Arc Browser" aesthetic—specifically the use of wavy borders and subtle grain/noise textures on background elements.
*   **Color Theory:** Use high-contrast color coding to define UI boundaries and structural elements rather than relying solely on whitespace or lines.
*   **Entry Layout:** Implement color-guided navigation within entry components to distinguish between data types and metadata.

## 2. Home Screen
*   **Architecture:** A dedicated landing page modeled after DeepWiki.
*   **Content:** Display a curated list of popular repositories (just stubs for now lol)

## 3. Search & DSL (Domain Specific Language)
*   **Editor Integration:** Use `svelte-codemirror-editor` for the search interface to ensure high-performance text handling.
*   **Autocomplete:** Must match the fluid, low-latency feedback of Helix or VSCode.
*   **Syntax Highlighting:** Full highlighting support within the DSL to improve readability. Each DSL-specific element needs to look stylistically unique.

## 4. Navigation & Accessibility
*   **Keybindings:**
    *   `Global Search:` `/` or `Ctrl+K`
    *   `Keyboard First:` All primary navigation must be accessible via keyboard.
*   **Structure:** Encode the main entry list as an unordered list (`<ul>`) of buttons to ensure proper focus management and screen reader compatibility.

## 5. Multi-Project Support and Grouping
* We want to avoid global DSL search of every repository ever, but people will use this relative to their multi-language, multi-library projects. It needs to support this sort of functionality natively, maybe with some kind of bottom tab bar (or similar concept) to quickly switch your browsing context.
