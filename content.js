(function () {
  if (window.top !== window.self) {
    return;
  }

  if (window.__latexCopyHelperInjected) {
    return;
  }
  window.__latexCopyHelperInjected = true;

  const FAB_ID = "latex-copy-helper-fab";
  const TOAST_ID = "latex-copy-helper-toast";
  const POSITION_KEY = "latex-copy-helper-position-v1";

  const UNICODE_SYMBOLS = {
    "≤": " \\leq ",
    "≥": " \\geq ",
    "≠": " \\neq ",
    "≈": " \\approx ",
    "∝": " \\propto ",
    "±": " \\pm ",
    "×": " \\times ",
    "÷": " \\div ",
    "·": " \\cdot ",
    "∞": " \\infty ",
    "∑": " \\sum ",
    "∏": " \\prod ",
    "∫": " \\int ",
    "∂": " \\partial ",
    "∇": " \\nabla ",
    "∈": " \\in ",
    "∉": " \\notin ",
    "∪": " \\cup ",
    "∩": " \\cap ",
    "⊂": " \\subset ",
    "⊆": " \\subseteq ",
    "⊃": " \\supset ",
    "⊇": " \\supseteq ",
    "→": " \\to ",
    "←": " \\leftarrow ",
    "↔": " \\leftrightarrow ",
    "⇒": " \\Rightarrow ",
    "⇔": " \\Leftrightarrow ",
    "−": "-",
    "∶": ":",
    "（": "(",
    "）": ")",
    "【": "[",
    "】": "]"
  };

  const GREEK_SYMBOLS = {
    "α": "\\alpha ",
    "β": "\\beta ",
    "γ": "\\gamma ",
    "δ": "\\delta ",
    "ε": "\\epsilon ",
    "ζ": "\\zeta ",
    "η": "\\eta ",
    "θ": "\\theta ",
    "ι": "\\iota ",
    "κ": "\\kappa ",
    "λ": "\\lambda ",
    "μ": "\\mu ",
    "ν": "\\nu ",
    "ξ": "\\xi ",
    "ο": "o",
    "π": "\\pi ",
    "ρ": "\\rho ",
    "σ": "\\sigma ",
    "τ": "\\tau ",
    "υ": "\\upsilon ",
    "φ": "\\phi ",
    "χ": "\\chi ",
    "ψ": "\\psi ",
    "ω": "\\omega ",
    "Γ": "\\Gamma ",
    "Δ": "\\Delta ",
    "Θ": "\\Theta ",
    "Λ": "\\Lambda ",
    "Ξ": "\\Xi ",
    "Π": "\\Pi ",
    "Σ": "\\Sigma ",
    "Υ": "\\Upsilon ",
    "Φ": "\\Phi ",
    "Ψ": "\\Psi ",
    "Ω": "\\Omega "
  };

  const BLOCK_SELECTOR =
    "p,div,section,article,header,footer,li,ul,ol,table,tr,td,th,h1,h2,h3,h4,h5,h6,blockquote,pre";

  const fab = document.createElement("button");
  fab.id = FAB_ID;
  fab.type = "button";
  fab.textContent = "TeX";
  fab.title = "Copy selected text and normalize LaTeX for Word";

  const toast = document.createElement("div");
  toast.id = TOAST_ID;

  document.documentElement.appendChild(fab);
  document.documentElement.appendChild(toast);

  let dragging = false;
  let moved = false;
  let pointerId = null;
  let startX = 0;
  let startY = 0;
  let originX = 0;
  let originY = 0;
  let currentLeft = 0;
  let currentTop = 0;

  initPosition();
  bindDragEvents();
  bindCopyAction();
  window.addEventListener("resize", () => {
    const clamped = clampPosition(currentLeft, currentTop);
    setPosition(clamped.left, clamped.top, false);
  });

  function initPosition() {
    const width = 56;
    const margin = 24;
    const defaultLeft = Math.max(8, window.innerWidth - width - margin);
    const defaultTop = 72;

    const saved = loadPosition();
    if (!saved) {
      setPosition(defaultLeft, defaultTop, false);
      return;
    }

    const clamped = clampPosition(saved.left, saved.top);
    setPosition(clamped.left, clamped.top, false);
  }

  function bindDragEvents() {
    fab.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) {
        return;
      }

      dragging = true;
      moved = false;
      pointerId = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;
      originX = currentLeft;
      originY = currentTop;
      fab.classList.add("is-dragging");
      fab.setPointerCapture(pointerId);
    });

    window.addEventListener("pointermove", (event) => {
      if (!dragging || event.pointerId !== pointerId) {
        return;
      }

      const deltaX = event.clientX - startX;
      const deltaY = event.clientY - startY;
      if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
        moved = true;
      }

      const next = clampPosition(originX + deltaX, originY + deltaY);
      setPosition(next.left, next.top, false);
    });

    window.addEventListener("pointerup", (event) => {
      if (!dragging || event.pointerId !== pointerId) {
        return;
      }

      dragging = false;
      fab.classList.remove("is-dragging");
      try {
        fab.releasePointerCapture(pointerId);
      } catch (error) {
        // Ignore pointer capture cleanup errors on pages that override events.
      }
      pointerId = null;
      savePosition(currentLeft, currentTop);
    });
  }

  function bindCopyAction() {
    fab.addEventListener("click", async () => {
      if (moved) {
        return;
      }

      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
        showToast("Please select text first", true);
        return;
      }

      const extracted = extractSelectionText(selection);
      const converted = convertToWordLatex(extracted);

      if (!converted.trim()) {
        showToast("No valid content found", true);
        return;
      }

      const copied = await copyToClipboard(converted);
      if (copied) {
        showToast("Copied and converted");
      } else {
        showToast("Copy failed: browser blocked clipboard", true);
      }
    });
  }

  function extractSelectionText(selection) {
    const parts = [];
    for (let i = 0; i < selection.rangeCount; i += 1) {
      const range = selection.getRangeAt(i);
      if (range.collapsed) {
        continue;
      }

      const normalizedFragment = normalizeFragment(range.cloneContents());
      const text = fragmentToText(normalizedFragment);
      if (text.trim()) {
        parts.push(text);
      }
    }

    if (parts.length === 0) {
      return selection.toString();
    }
    return parts.join("\n");
  }

  function normalizeFragment(fragment) {
    const container = document.createElement("div");
    container.appendChild(fragment);

    replaceMathNodes(container);

    const output = document.createDocumentFragment();
    while (container.firstChild) {
      output.appendChild(container.firstChild);
    }
    return output;
  }

  function replaceMathNodes(container) {
    const replacedNodes = new Set();
    const annotationNodes = container.querySelectorAll(
      "annotation[encoding*='tex' i], annotation[encoding*='latex' i]"
    );

    annotationNodes.forEach((annotation) => {
      const latex = cleanLatexText(annotation.textContent || "");
      if (!latex) {
        return;
      }

      let mathRoot = annotation.closest("mjx-container, .MathJax, .katex, math");
      if (!mathRoot) {
        mathRoot = annotation;
      }

      if (replacedNodes.has(mathRoot)) {
        return;
      }
      replacedNodes.add(mathRoot);

      const marker = document.createElement("span");
      marker.setAttribute("data-latex-copy-helper", "true");
      marker.textContent = ` ${stripMathDelimiters(latex)} `;
      mathRoot.replaceWith(marker);
    });

    const attrMathNodes = container.querySelectorAll("[data-tex], [data-latex]");
    attrMathNodes.forEach((node) => {
      if (replacedNodes.has(node)) {
        return;
      }

      const raw = node.getAttribute("data-tex") || node.getAttribute("data-latex") || "";
      const latex = cleanLatexText(raw);
      if (!latex) {
        return;
      }

      const marker = document.createElement("span");
      marker.setAttribute("data-latex-copy-helper", "true");
      marker.textContent = ` ${stripMathDelimiters(latex)} `;
      node.replaceWith(marker);
      replacedNodes.add(node);
    });

    container.querySelectorAll("br").forEach((br) => {
      br.replaceWith("\n");
    });

    container.querySelectorAll(BLOCK_SELECTOR).forEach((element) => {
      element.appendChild(document.createTextNode("\n"));
    });
  }

  function fragmentToText(fragment) {
    const temp = document.createElement("div");
    temp.appendChild(fragment);
    return temp.textContent || "";
  }

  function convertToWordLatex(input) {
    let text = decodeHtmlEntities(input || "");
    text = text.replace(/\u00A0/g, " ");

    text = unwrapMathDelimiters(text);
    text = normalizeLatexCommands(text);
    text = replaceUnicodeSymbols(text);
    text = normalizeWhitespace(text);

    return text.trim();
  }

  function unwrapMathDelimiters(text) {
    text = text.replace(/\\\[((?:.|\n)*?)\\\]/g, "$1");
    text = text.replace(/\\\(((?:.|\n)*?)\\\)/g, "$1");
    text = text.replace(/\$\$((?:.|\n)*?)\$\$/g, "$1");

    return text.replace(/\$([^$\n]+)\$/g, (match, inner) => {
      if (!looksLikeMath(inner)) {
        return match;
      }
      return inner;
    });
  }

  function normalizeLatexCommands(text) {
    let output = text;
    output = output.replace(/\\dfrac\b/g, "\\frac");
    output = output.replace(/\\tfrac\b/g, "\\frac");
    output = output.replace(/\\displaystyle\b/g, "");
    output = output.replace(/\\textstyle\b/g, "");
    output = output.replace(/\\left\s*/g, "");
    output = output.replace(/\\right\s*/g, "");
    output = output.replace(/\\,/g, " ");
    output = output.replace(/\\!/g, "");
    output = output.replace(/\\;/g, " ");
    output = output.replace(/\\:/g, " ");
    return output;
  }

  function replaceUnicodeSymbols(text) {
    let output = text;

    Object.entries(UNICODE_SYMBOLS).forEach(([symbol, latex]) => {
      output = output.split(symbol).join(latex);
    });

    Object.entries(GREEK_SYMBOLS).forEach(([symbol, latex]) => {
      output = output.split(symbol).join(latex);
    });

    output = output.replace(/√\s*([A-Za-z0-9]+)/g, "\\sqrt{$1}");
    return output;
  }

  function normalizeWhitespace(text) {
    let output = text;
    output = output.replace(/[ \t]+/g, " ");
    output = output.replace(/ *\n */g, "\n");
    output = output.replace(/\n{3,}/g, "\n\n");
    return output;
  }

  function cleanLatexText(text) {
    return (text || "").replace(/\s+/g, " ").trim();
  }

  function stripMathDelimiters(text) {
    let output = (text || "").trim();
    output = output.replace(/^\\\((.*)\\\)$/s, "$1");
    output = output.replace(/^\\\[(.*)\\\]$/s, "$1");
    output = output.replace(/^\$(.*)\$$/s, "$1");
    return output.trim();
  }

  function looksLikeMath(text) {
    return /\\[a-zA-Z]+|[_^{}]|[α-ωΑ-Ω]|[∑∏∫√≤≥≠∞]/.test(text);
  }

  function decodeHtmlEntities(text) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  }

  async function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (error) {
        // Fallback below.
      }
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "readonly");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    textarea.style.pointerEvents = "none";
    textarea.style.zIndex = "-1";
    document.documentElement.appendChild(textarea);
    textarea.focus();
    textarea.select();

    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch (error) {
      copied = false;
    } finally {
      textarea.remove();
    }
    return copied;
  }

  function clampPosition(left, top) {
    const rect = fab.getBoundingClientRect();
    const width = rect.width || 56;
    const height = rect.height || 56;
    const minLeft = 8;
    const minTop = 8;
    const maxLeft = Math.max(minLeft, window.innerWidth - width - 8);
    const maxTop = Math.max(minTop, window.innerHeight - height - 8);

    return {
      left: Math.min(Math.max(left, minLeft), maxLeft),
      top: Math.min(Math.max(top, minTop), maxTop)
    };
  }

  function setPosition(left, top, persist) {
    currentLeft = left;
    currentTop = top;
    fab.style.left = `${left}px`;
    fab.style.top = `${top}px`;
    if (persist) {
      savePosition(left, top);
    }
  }

  function savePosition(left, top) {
    try {
      localStorage.setItem(POSITION_KEY, JSON.stringify({ left, top }));
    } catch (error) {
      // Ignore storage errors from strict privacy pages.
    }
  }

  function loadPosition() {
    try {
      const raw = localStorage.getItem(POSITION_KEY);
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed.left !== "number" || typeof parsed.top !== "number") {
        return null;
      }
      return parsed;
    } catch (error) {
      return null;
    }
  }

  let toastTimer = null;
  function showToast(message, isError) {
    toast.textContent = message;
    toast.classList.remove("is-error");
    toast.classList.add("is-show");
    if (isError) {
      toast.classList.add("is-error");
    }

    if (toastTimer) {
      clearTimeout(toastTimer);
    }
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("is-show");
      toast.classList.remove("is-error");
    }, 1800);
  }
})();
