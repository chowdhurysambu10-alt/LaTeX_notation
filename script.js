/**
 * C++ to LaTeX Converter Logic
 */

// 1. Math Parser Logic
function parseCppToLatex(cppCode) {
    if (!cppCode || typeof cppCode !== 'string') return '';

    let latex = cppCode;

    // Greek letters and constants
    const constants = {
        'pi': '\\pi ',
        'alpha': '\\alpha ',
        'beta': '\\beta ',
        'gamma': '\\gamma ',
        'delta': '\\delta ',
        'theta': '\\theta ',
        'lambda': '\\lambda ',
        'omega': '\\omega ',
        '<=': '\\leq ',
        '>=': '\\geq ',
        '!=': '\\neq ',
        '==': '=',
        '*': '\\cdot ',
    };

    // Replace constants with word boundaries for words
    Object.keys(constants).forEach(key => {
        if (/^[a-zA-Z]+$/.test(key)) {
            latex = latex.replace(new RegExp(`\\b${key}\\b`, 'g'), constants[key]);
        } else {
            const escapedKey = key.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
            latex = latex.replace(new RegExp(escapedKey, 'g'), constants[key]);
        }
    });

    // Replace basic functions
    const basicFuncs = ['sin', 'cos', 'tan', 'log', 'ln', 'exp', 'asin', 'acos', 'atan'];
    basicFuncs.forEach(func => {
        latex = latex.replace(new RegExp(`\\b${func}\\s*\\(`, 'g'), `\\${func}(`);
    });

    // Replace sqrt(x) with \sqrt{x}
    latex = latex.replace(/\bsqrt\s*\(([^)]+)\)/g, '\\sqrt{$1}');
    
    // Replace pow(base, exp) with base^{exp}
    latex = latex.replace(/\bpow\s*\(\s*([^,]+)\s*,\s*([^)]+)\s*\)/g, '{$1}^{$2}');

    // Replace abs(x) with \left| x \right|
    latex = latex.replace(/\babs\s*\(([^)]+)\)/g, '\\left| $1 \\right|');

    // Replace division
    let prev;
    do {
        prev = latex;
        latex = latex.replace(/([a-zA-Z0-9.\\]+(?:\([^)]+\))?|{[^}]+}|\([^)]+\))\s*\/\s*([a-zA-Z0-9.\\]+(?:\([^)]+\))?|{[^}]+}|\([^)]+\))/g, '\\frac{$1}{$2}');
    } while (latex !== prev);

    // Clean up unnecessary visual outer parentheses around fraction numerators/denominators
    latex = latex.replace(/\\frac{\(([^)]+)\)}{\(([^)]+)\)}/g, '\\frac{$1}{$2}');
    latex = latex.replace(/\\frac{\(([^)]+)\)}/g, '\\frac{$1}');
    latex = latex.replace(/}{\(([^)]+)\)}/g, '}{$1}');

    return latex;
}

// 2. Application Logic
document.addEventListener('DOMContentLoaded', () => {
    const defaultCode = `// Enter your C++ math expression here
// Example:
result = (sin(x) / cos(x)) + pow(beta, 2)
`;

    let currentCpp = defaultCode;
    let currentLatex = '';

    // Elements
    const rawLatexText = document.getElementById('raw-latex-text');
    const katexDisplay = document.getElementById('katex-display');
    const errorContainer = document.getElementById('katex-error');
    const errorMsg = document.getElementById('error-msg');
    
    const copyBtn = document.getElementById('copy-btn');
    const copyCodeBtn = document.getElementById('copy-code-btn');

    // Renderer function
    function updateRenderer(cppCode) {
        currentCpp = cppCode;
        const latex = parseCppToLatex(cppCode);
        currentLatex = latex;
        
        rawLatexText.innerText = latex || '\\text{Enter math on the left}';

        try {
            katex.render(latex, katexDisplay, {
                throwOnError: true,
                displayMode: true,
                strict: false
            });
            errorContainer.style.display = 'none';
            katexDisplay.classList.remove('has-error');
        } catch (e) {
            errorMsg.innerText = e.message;
            errorContainer.style.display = 'block';
            katexDisplay.classList.add('has-error');
        }
    }

    // Initialize initial render
    updateRenderer(defaultCode);

    // Initialize Monaco Editor
    // Require config for Monaco via AMD
    require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.46.0/min/vs' } });
    
    // Load the monaco editor standard dependencies
    require(['vs/editor/editor.main'], function () {
        const editor = monaco.editor.create(document.getElementById('monaco-container'), {
            value: defaultCode,
            language: 'cpp',
            theme: 'vs-dark',
            minimap: { enabled: false },
            fontSize: 16,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            formatOnPaste: true,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            padding: { top: 16, bottom: 16 },
            automaticLayout: true
        });

        editor.onDidChangeModelContent(() => {
            updateRenderer(editor.getValue());
        });
        
        // Setup copy bindings
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(editor.getValue());
            copyBtn.innerText = '✔️';
            setTimeout(() => { copyBtn.innerText = '📋'; }, 2000);
        });
    });

    copyCodeBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(currentLatex);
        copyCodeBtn.innerHTML = '<span class="btn-text">✔️ Copied</span>';
        setTimeout(() => { copyCodeBtn.innerHTML = '<span class="btn-text">📋 Copy Code</span>'; }, 2000);
    });
});
