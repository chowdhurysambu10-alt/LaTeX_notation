# ∑ C++ to Math Converter

> A real-time mathematical expression converter that transforms C++-style code into beautifully rendered LaTeX notation — right in your browser.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![KaTeX](https://img.shields.io/badge/KaTeX-0.16.9-brightgreen)
![Monaco](https://img.shields.io/badge/Monaco_Editor-0.44-blue)

---

## ✨ Live Demo

Open `index.html` directly in any modern browser — no build step, no server required.

---

## 📸 Preview

| Dark Mode | Light Mode |
|-----------|------------|
| Type `pow(x,2) / (x+1)` → renders as **x² / (x+1)** | Full dark/light theme toggle |

---

## 🚀 Features

- **Real-time conversion** — Live LaTeX rendering as you type (300ms debounce)
- **Monaco Editor** — Full syntax-highlighted C++ code editor
- **KaTeX rendering** — Fast, high-quality math typesetting
- **Dark / Light mode** — Persisted via `localStorage`
- **Expression history** — Last 20 expressions saved locally
- **Copy LaTeX** — One-click clipboard copy
- **Multi-line support** — Each line renders as a separate math block
- **Resizable split pane** — Drag the divider to resize editor vs output
- **Fully responsive** — Works on mobile and desktop
- **Zero dependencies** — Single HTML file, no npm, no build tools

---

## 🧮 Supported Syntax

### Operators

| C++ | LaTeX | Example |
|-----|-------|---------|
| `a / b` | `\frac{a}{b}` | `x / 2` → $\frac{x}{2}$ |
| `a * b` | `a \times b` | `x * y` → $x \times y$ |
| `a ^ b` | `a^{b}` | `x ^ 2` → $x^{2}$ |
| `a + b` | `a + b` | — |
| `a - b` | `a - b` | — |
| `-a` | `-a` | unary minus |

### Functions

| C++ Function | LaTeX Output |
|---|---|
| `pow(a, b)` | `a^{b}` |
| `sqrt(x)` | `\sqrt{x}` |
| `cbrt(x)` | `\sqrt[3]{x}` |
| `abs(x)` | `\|x\|` |
| `exp(x)` | `e^{x}` |
| `ln(x)` | `\ln(x)` |
| `log(x)` | `\log(x)` |
| `log(x, b)` | `\log_{b}(x)` |
| `sin(x)` | `\sin(x)` |
| `cos(x)` | `\cos(x)` |
| `tan(x)` | `\tan(x)` |
| `asin(x)` | `\arcsin(x)` |
| `acos(x)` | `\arccos(x)` |
| `atan(x)` | `\arctan(x)` |
| `floor(x)` | `\lfloor x \rfloor` |
| `ceil(x)` | `\lceil x \rceil` |
| `min(a, b)` | `\min(a, b)` |
| `max(a, b)` | `\max(a, b)` |
| `gcd(a, b)` | `\gcd(a, b)` |

### Greek Letters (auto-detected)

Variables named after Greek letters are automatically converted:

```
alpha β → \alpha,  beta → \beta,  pi → \pi,  mu → \mu,
sigma → \sigma,  omega → \omega,  theta → \theta, ...
```

---

## 💡 Example Expressions

```cpp
// Quadratic formula
(-b + sqrt(pow(b,2) - 4*a*c)) / (2*a)

// Gaussian / Normal distribution
(1 / sqrt(2 * pi * pow(sigma,2))) * exp(-pow(x - mu, 2) / (2 * pow(sigma,2)))

// Pythagorean distance
sqrt(pow(x,2) + pow(y,2))

// Sigmoid (neural networks)
1 / (1 + exp(-x))

// Compound interest
pow(1 + r/n, n*t)

// Z-score
abs(x - mu) / sigma

// Black-Scholes d1
(ln(S / K) + (r + pow(sigma,2)/2) * T) / (sigma * sqrt(T))
```

---

## 🏗️ Architecture

The converter is built as three clean, independent modules inside a single HTML file:

```
┌─────────────────────────────────────────────────┐
│                   index.html                    │
│                                                 │
│  ┌───────────┐  ┌──────────┐  ┌─────────────┐  │
│  │ Tokenizer │→ │  Parser  │→ │  LaTeX Gen  │  │
│  │           │  │  (AST)   │  │             │  │
│  └───────────┘  └──────────┘  └─────────────┘  │
│                                                 │
│  ┌──────────────┐   ┌────────────────────────┐  │
│  │ AppController│   │   HistoryManager        │  │
│  │  (UI / UX)   │   │  (localStorage)         │  │
│  └──────────────┘   └────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

### `Tokenizer`
Lexes the raw input string into typed tokens (`NUM`, `IDENT`, `OP`, `LPAREN`, `RPAREN`, `COMMA`, `EOF`).

### `Parser`
Recursive-descent Pratt parser. Builds an Abstract Syntax Tree (AST) with correct operator precedence:

```
Precedence:  ^ (3) > * / (2) > + - (1)
```

### `LaTeXGenerator`
Walks the AST and emits LaTeX strings, handling:
- Fraction detection for `/`
- Superscript grouping for `^`
- Parenthesization rules to preserve precedence
- Greek letter substitution for variable names
- Function-specific LaTeX macros

---

## 🗂️ Project Structure

```
cpp-to-math-converter/
└── index.html          # Entire app — self-contained single file
```

---

## 🛠️ Getting Started

### Option 1 — Open directly
```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/cpp-to-math-converter.git

# Open in browser
open index.html         # macOS
start index.html        # Windows
xdg-open index.html     # Linux
```

### Option 2 — Serve locally (optional)
```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

Then visit `http://localhost:8000`.

---

## 🌐 CDN Dependencies (loaded automatically)

| Library | Version | Purpose |
|---------|---------|---------|
| [KaTeX](https://katex.org/) | 0.16.9 | LaTeX math rendering |
| [Monaco Editor](https://microsoft.github.io/monaco-editor/) | 0.44.0 | Code editor with C++ syntax highlighting |

No installation needed — all loaded via CDN at runtime.

---

## ⌨️ Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| New line / multi-expression | `Enter` |
| Copy LaTeX output | Click "⎘ Copy LaTeX" button |
| Clear editor | Click "✕ Clear" button |

---

## 🔧 Error Handling

The parser provides descriptive error messages for:

- Unexpected characters (e.g. `@`, `#`)
- Mismatched parentheses
- Invalid number format (e.g. `3.1.4`)
- Unexpected end of input
- Unknown / extra tokens after a valid expression

Errors are displayed inline in the output panel with a clear visual indicator.

---

## 🗺️ Roadmap

- [ ] Support for `sum(expr, lower, upper)` → `\sum_{lower}^{upper}`
- [ ] Support for `int(expr, a, b)` → `\int_{a}^{b}`
- [ ] Matrix/vector notation
- [ ] Export output as PDF
- [ ] Drag-and-drop equation builder
- [ ] Shareable expression URLs

---

## 🤝 Contributing

Contributions are welcome! To add a new function:

1. Add the function name to `LaTeXGenerator.genFuncCall()`'s `fnMap` object
2. Map it to the correct LaTeX string
3. Test with edge cases (nested expressions, multi-argument, etc.)

---

## 📄 License

MIT © 2024 — free to use, modify, and distribute.

---

<p align="center">Built with ❤️ — bridging the gap between code and mathematics</p>
