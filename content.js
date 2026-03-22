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
  const MATH_START = "<<<LATEX_MATH_START>>>";
  const MATH_END = "<<<LATEX_MATH_END>>>";

  const BLOCK_SELECTOR =
    "p,div,section,article,header,footer,li,ul,ol,table,tr,td,th,h1,h2,h3,h4,h5,h6,blockquote,pre";

  const UNICODE_TO_LATEX = {
    "\u2264": " \\leq ",
    "\u2265": " \\geq ",
    "\u2260": " \\neq ",
    "\u2248": " \\approx ",
    "\u221d": " \\propto ",
    "\u00b1": " \\pm ",
    "\u00d7": " \\times ",
    "\u00f7": " \\div ",
    "\u00b7": " \\cdot ",
    "\u221e": " \\infty ",
    "\u2211": " \\sum ",
    "\u220f": " \\prod ",
    "\u222b": " \\int ",
    "\u2202": " \\partial ",
    "\u2207": " \\nabla ",
    "\u2208": " \\in ",
    "\u2209": " \\notin ",
    "\u222a": " \\cup ",
    "\u2229": " \\cap ",
    "\u2282": " \\subset ",
    "\u2286": " \\subseteq ",
    "\u2283": " \\supset ",
    "\u2287": " \\supseteq ",
    "\u2192": " \\to ",
    "\u2190": " \\leftarrow ",
    "\u2194": " \\leftrightarrow ",
    "\u21d2": " \\Rightarrow ",
    "\u21d4": " \\Leftrightarrow ",
    "\u2212": "-",
    "\uff08": "(",
    "\uff09": ")",
    "\u3010": "[",
    "\u3011": "]"
  };

  const GREEK_TO_LATEX = {
    "\u03b1": "\\alpha ",
    "\u03b2": "\\beta ",
    "\u03b3": "\\gamma ",
    "\u03b4": "\\delta ",
    "\u03b5": "\\epsilon ",
    "\u03b6": "\\zeta ",
    "\u03b7": "\\eta ",
    "\u03b8": "\\theta ",
    "\u03b9": "\\iota ",
    "\u03ba": "\\kappa ",
    "\u03bb": "\\lambda ",
    "\u03bc": "\\mu ",
    "\u03bd": "\\nu ",
    "\u03be": "\\xi ",
    "\u03c0": "\\pi ",
    "\u03c1": "\\rho ",
    "\u03c3": "\\sigma ",
    "\u03c4": "\\tau ",
    "\u03c5": "\\upsilon ",
    "\u03c6": "\\phi ",
    "\u03c7": "\\chi ",
    "\u03c8": "\\psi ",
    "\u03c9": "\\omega ",
    "\u0393": "\\Gamma ",
    "\u0394": "\\Delta ",
    "\u0398": "\\Theta ",
    "\u039b": "\\Lambda ",
    "\u039e": "\\Xi ",
    "\u03a0": "\\Pi ",
    "\u03a3": "\\Sigma ",
    "\u03a5": "\\Upsilon ",
    "\u03a6": "\\Phi ",
    "\u03a8": "\\Psi ",
    "\u03a9": "\\Omega "
  };

  const GREEK_CHAR_TO_NAME = {
    "\u03b1": "alpha",
    "\u03b2": "beta",
    "\u03b3": "gamma",
    "\u03b4": "delta",
    "\u03b5": "epsilon",
    "\u03b6": "zeta",
    "\u03b7": "eta",
    "\u03b8": "theta",
    "\u03b9": "iota",
    "\u03ba": "kappa",
    "\u03bb": "lambda",
    "\u03bc": "mu",
    "\u03bd": "nu",
    "\u03be": "xi",
    "\u03c0": "pi",
    "\u03c1": "rho",
    "\u03c3": "sigma",
    "\u03c4": "tau",
    "\u03c5": "upsilon",
    "\u03c6": "phi",
    "\u03c7": "chi",
    "\u03c8": "psi",
    "\u03c9": "omega",
    "\u0393": "Gamma",
    "\u0394": "Delta",
    "\u0398": "Theta",
    "\u039b": "Lambda",
    "\u039e": "Xi",
    "\u03a0": "Pi",
    "\u03a3": "Sigma",
    "\u03a5": "Upsilon",
    "\u03a6": "Phi",
    "\u03a8": "Psi",
    "\u03a9": "Omega"
  };

  const LATEX_CMD_TO_CHAR = {
    alpha: "\u03b1",
    beta: "\u03b2",
    gamma: "\u03b3",
    delta: "\u03b4",
    epsilon: "\u03b5",
    varepsilon: "\u03f5",
    zeta: "\u03b6",
    eta: "\u03b7",
    theta: "\u03b8",
    vartheta: "\u03d1",
    iota: "\u03b9",
    kappa: "\u03ba",
    lambda: "\u03bb",
    mu: "\u03bc",
    nu: "\u03bd",
    xi: "\u03be",
    pi: "\u03c0",
    varpi: "\u03d6",
    rho: "\u03c1",
    varrho: "\u03f1",
    sigma: "\u03c3",
    varsigma: "\u03c2",
    tau: "\u03c4",
    upsilon: "\u03c5",
    phi: "\u03d5",
    varphi: "\u03c6",
    chi: "\u03c7",
    psi: "\u03c8",
    omega: "\u03c9",
    Gamma: "\u0393",
    Delta: "\u0394",
    Theta: "\u0398",
    Lambda: "\u039b",
    Xi: "\u039e",
    Pi: "\u03a0",
    Sigma: "\u03a3",
    Upsilon: "\u03a5",
    Phi: "\u03a6",
    Psi: "\u03a8",
    Omega: "\u03a9",
    ell: "\u2113",
    hbar: "\u210f",
    imath: "\u0131",
    jmath: "\u0237",
    wp: "\u2118",
    Re: "\u211c",
    Im: "\u2111",
    aleph: "\u2135",
    beth: "\u2136",
    gimel: "\u2137",
    daleth: "\u2138",
    infty: "\u221e",
    partial: "\u2202",
    nabla: "\u2207",
    sum: "\u2211",
    prod: "\u220f",
    int: "\u222b"
  };

  const LATEX_CMD_TO_OPERATOR = {
    cdot: "\u22c5",
    ldots: "\u2026",
    cdots: "\u22ef",
    vdots: "\u22ee",
    ddots: "\u22f1",
    dots: "\u2026",
    times: "\u00d7",
    div: "\u00f7",
    pm: "\u00b1",
    mp: "\u2213",
    ast: "\u2217",
    star: "\u22c6",
    circ: "\u2218",
    bullet: "\u2219",
    le: "\u2264",
    leq: "\u2264",
    leqq: "\u2266",
    ge: "\u2265",
    geq: "\u2265",
    geqq: "\u2267",
    neq: "\u2260",
    ne: "\u2260",
    equiv: "\u2261",
    cong: "\u2245",
    propto: "\u221d",
    approx: "\u2248",
    sim: "\u223c",
    simeq: "\u2243",
    asymp: "\u224d",
    ll: "\u226a",
    gg: "\u226b",
    in: "\u2208",
    notin: "\u2209",
    ni: "\u220b",
    owns: "\u220b",
    subset: "\u2282",
    subseteq: "\u2286",
    subsetneq: "\u228a",
    subsetneqq: "\u2acb",
    supset: "\u2283",
    supseteq: "\u2287",
    supsetneq: "\u228b",
    supsetneqq: "\u2acc",
    nsubseteq: "\u2288",
    nsupseteq: "\u2289",
    emptyset: "\u2205",
    varnothing: "\u2205",
    forall: "\u2200",
    exists: "\u2203",
    nexists: "\u2204",
    neg: "\u00ac",
    lnot: "\u00ac",
    cup: "\u222a",
    cap: "\u2229",
    bigcup: "\u222a",
    bigcap: "\u2229",
    bigsqcup: "\u2294",
    bigvee: "\u2228",
    bigwedge: "\u2227",
    bigoplus: "\u2295",
    bigotimes: "\u2297",
    bigodot: "\u2299",
    biguplus: "\u228e",
    setminus: "\u2216",
    smallsetminus: "\u2216",
    sqcup: "\u2294",
    sqcap: "\u2293",
    land: "\u2227",
    lor: "\u2228",
    wedge: "\u2227",
    vee: "\u2228",
    oplus: "\u2295",
    otimes: "\u2297",
    odot: "\u2299",
    oslash: "\u2298",
    ominus: "\u2296",
    to: "\u2192",
    mapsto: "\u21a6",
    leftarrow: "\u2190",
    rightarrow: "\u2192",
    leftrightarrow: "\u2194",
    Rightarrow: "\u21d2",
    Leftarrow: "\u21d0",
    Leftrightarrow: "\u21d4",
    longleftarrow: "\u27f5",
    longrightarrow: "\u27f6",
    longleftrightarrow: "\u27f7",
    Longleftarrow: "\u27f8",
    Longrightarrow: "\u27f9",
    Longleftrightarrow: "\u27fa",
    hookleftarrow: "\u21a9",
    hookrightarrow: "\u21aa",
    uparrow: "\u2191",
    downarrow: "\u2193",
    updownarrow: "\u2195",
    Uparrow: "\u21d1",
    Downarrow: "\u21d3",
    Updownarrow: "\u21d5",
    nearrow: "\u2197",
    searrow: "\u2198",
    swarrow: "\u2199",
    nwarrow: "\u2196",
    arrow: "\u2192",
    rarrow: "\u2192",
    larrow: "\u2190",
    parallel: "\u2225",
    nparallel: "\u2226",
    perp: "\u22a5",
    angle: "\u2220",
    measuredangle: "\u2221",
    sphericalangle: "\u2222",
    triangle: "\u25b3",
    therefore: "\u2234",
    because: "\u2235",
    colon: ":",
    prime: "\u2032",
    implies: "\u21d2",
    iff: "\u21d4",
    gets: "\u2190",
    top: "\u22a4",
    bot: "\u22a5",
    lbrace: "{",
    rbrace: "}",
    lvert: "|",
    rvert: "|",
    lVert: "\u2016",
    rVert: "\u2016",
    langle: "\u27e8",
    rangle: "\u27e9",
    lfloor: "\u230a",
    rfloor: "\u230b",
    lceil: "\u2308",
    rceil: "\u2309",
    mid: "|",
    vert: "|",
    Vert: "\u2016"
  };

  const LATEX_ACCENT_COMMANDS = {
    hat: {
      mathml: "\u02c6",
      omml: "\u0302",
      readable: "hat"
    },
    widehat: {
      mathml: "\u02c6",
      omml: "\u0302",
      readable: "hat"
    },
    tilde: {
      mathml: "\u02dc",
      omml: "\u0303",
      readable: "tilde"
    },
    widetilde: {
      mathml: "\u02dc",
      omml: "\u0303",
      readable: "tilde"
    },
    check: {
      mathml: "\u02c7",
      omml: "\u030c",
      readable: "check"
    },
    breve: {
      mathml: "\u02d8",
      omml: "\u0306",
      readable: "breve"
    },
    acute: {
      mathml: "\u00b4",
      omml: "\u0301",
      readable: "acute"
    },
    grave: {
      mathml: "\u02cb",
      omml: "\u0300",
      readable: "grave"
    },
    dot: {
      mathml: "\u02d9",
      omml: "\u0307",
      readable: "dot"
    },
    ddot: {
      mathml: "\u00a8",
      omml: "\u0308",
      readable: "ddot"
    },
    vec: {
      mathml: "\u2192",
      omml: "\u20d7",
      readable: "vec"
    },
    overrightarrow: {
      mathml: "\u2192",
      omml: "\u20d7",
      readable: "vec"
    },
    overleftarrow: {
      mathml: "\u2190",
      omml: "\u20d6",
      readable: "leftarrow"
    },
    overleftrightarrow: {
      mathml: "\u2194",
      omml: "\u20e1",
      readable: "leftrightarrow"
    }
  };

  const LATEX_NOT_TO_OPERATOR = {
    "=": "\u2260",
    "<": "\u226e",
    ">": "\u226f",
    "|": "\u2224",
    in: "\u2209",
    ni: "\u220c",
    mid: "\u2224",
    parallel: "\u2226",
    equiv: "\u2262",
    sim: "\u2241",
    approx: "\u2249",
    cong: "\u2247",
    le: "\u2270",
    leq: "\u2270",
    ge: "\u2271",
    geq: "\u2271",
    subset: "\u2284",
    subseteq: "\u2288",
    supset: "\u2285",
    supseteq: "\u2289"
  };

  const IGNORED_LATEX_COMMANDS = new Set([
    "displaystyle",
    "textstyle",
    "scriptstyle",
    "scriptscriptstyle",
    "limits",
    "nolimits",
    "displaylimits",
    "left",
    "right",
    "middle",
    "big",
    "Big",
    "bigg",
    "Bigg",
    "bigl",
    "bigr",
    "bigm",
    "Bigl",
    "Bigr",
    "Bigm",
    "biggl",
    "biggr",
    "biggm",
    "Biggl",
    "Biggr",
    "Biggm"
  ]);

  const SCRIPT_STYLE_CODEPOINTS = {
    upper: {
      A: 0x1d49c,
      B: 0x212c,
      C: 0x1d49e,
      D: 0x1d49f,
      E: 0x2130,
      F: 0x2131,
      G: 0x1d4a2,
      H: 0x210b,
      I: 0x2110,
      J: 0x1d4a5,
      K: 0x1d4a6,
      L: 0x2112,
      M: 0x2133,
      N: 0x1d4a9,
      O: 0x1d4aa,
      P: 0x1d4ab,
      Q: 0x1d4ac,
      R: 0x211b,
      S: 0x1d4ae,
      T: 0x1d4af,
      U: 0x1d4b0,
      V: 0x1d4b1,
      W: 0x1d4b2,
      X: 0x1d4b3,
      Y: 0x1d4b4,
      Z: 0x1d4b5
    },
    lower: {
      a: 0x1d4b6,
      b: 0x1d4b7,
      c: 0x1d4b8,
      d: 0x1d4b9,
      e: 0x212f,
      f: 0x1d4bb,
      g: 0x210a,
      h: 0x1d4bd,
      i: 0x1d4be,
      j: 0x1d4bf,
      k: 0x1d4c0,
      l: 0x1d4c1,
      m: 0x1d4c2,
      n: 0x1d4c3,
      o: 0x2134,
      p: 0x1d4c5,
      q: 0x1d4c6,
      r: 0x1d4c7,
      s: 0x1d4c8,
      t: 0x1d4c9,
      u: 0x1d4ca,
      v: 0x1d4cb,
      w: 0x1d4cc,
      x: 0x1d4cd,
      y: 0x1d4ce,
      z: 0x1d4cf
    }
  };

  const DOUBLE_STRUCK_STYLE_CODEPOINTS = {
    upper: {
      A: 0x1d538,
      B: 0x1d539,
      C: 0x2102,
      D: 0x1d53b,
      E: 0x1d53c,
      F: 0x1d53d,
      G: 0x1d53e,
      H: 0x210d,
      I: 0x1d540,
      J: 0x1d541,
      K: 0x1d542,
      L: 0x1d543,
      M: 0x1d544,
      N: 0x2115,
      O: 0x1d546,
      P: 0x2119,
      Q: 0x211a,
      R: 0x211d,
      S: 0x1d54a,
      T: 0x1d54b,
      U: 0x1d54c,
      V: 0x1d54d,
      W: 0x1d54e,
      X: 0x1d54f,
      Y: 0x1d550,
      Z: 0x2124
    }
  };

  const MATRIX_ENVIRONMENT_DELIMITERS = {
    matrix: { left: "", right: "" },
    smallmatrix: { left: "", right: "" },
    bmatrix: { left: "[", right: "]" },
    pmatrix: { left: "(", right: ")" },
    Bmatrix: { left: "{", right: "}" },
    vmatrix: { left: "|", right: "|" },
    Vmatrix: { left: "\u2016", right: "\u2016" },
    cases: { left: "{", right: "" }
  };

  const fab = document.createElement("button");
  fab.id = FAB_ID;
  fab.type = "button";
  fab.textContent = "TeX";
  fab.title = "Export selection to Word (.docx) with equations";

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
  let toastTimer = null;

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
        // Ignore pointer capture cleanup errors.
      }

      pointerId = null;
      savePosition(currentLeft, currentTop);
    });
  }

  function bindCopyAction() {
    fab.addEventListener("click", () => {
      if (moved) {
        return;
      }

      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
        showToast("Please select text first", true);
        return;
      }

      const extracted = extractSelectionText(selection);
      const payload = buildClipboardPayload(extracted);

      if (!payload.plainText.trim()) {
        showToast("No valid content found", true);
        return;
      }

      const exported = exportPayloadToDocx(payload);
      if (exported) {
        showToast(payload.hasMath ? "Exported DOCX with equations" : "Exported DOCX");
      } else {
        showToast("Export failed", true);
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

      const fragment = range.cloneContents();
      const normalized = normalizeFragment(fragment);
      const text = fragmentToText(normalized);
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
    const replaced = new Set();
    const annotationNodes = container.querySelectorAll(
      "annotation[encoding*='tex' i], annotation[encoding*='latex' i]"
    );

    annotationNodes.forEach((annotation) => {
      const latex = cleanLatexText(annotation.textContent || "");
      if (!latex) {
        return;
      }

      const root = findPreferredMathRoot(annotation);

      if (replaced.has(root)) {
        return;
      }

      const marker = document.createElement("span");
      marker.setAttribute("data-latex-copy-helper", "true");
      marker.textContent = `${MATH_START}${stripMathDelimiters(latex)}${MATH_END}`;
      root.replaceWith(marker);
      replaced.add(root);
    });

    const attrMathNodes = container.querySelectorAll("[data-tex], [data-latex]");
    attrMathNodes.forEach((node) => {
      if (replaced.has(node)) {
        return;
      }

      const raw = node.getAttribute("data-tex") || node.getAttribute("data-latex") || "";
      const latex = cleanLatexText(raw);
      if (!latex) {
        return;
      }

      const marker = document.createElement("span");
      marker.setAttribute("data-latex-copy-helper", "true");
      marker.textContent = `${MATH_START}${stripMathDelimiters(latex)}${MATH_END}`;
      node.replaceWith(marker);
      replaced.add(node);
    });

    container.querySelectorAll("br").forEach((node) => {
      node.replaceWith("\n");
    });

    container.querySelectorAll(BLOCK_SELECTOR).forEach((node) => {
      node.appendChild(document.createTextNode("\n"));
    });
  }

  function findPreferredMathRoot(annotation) {
    const mjx = annotation.closest("mjx-container");
    if (mjx) {
      return mjx;
    }

    const katex = annotation.closest(".katex");
    if (katex) {
      return katex;
    }

    const mathJax = annotation.closest(".MathJax");
    if (mathJax) {
      return mathJax;
    }

    const math = annotation.closest("math");
    if (math) {
      return math;
    }

    return annotation;
  }

  function fragmentToText(fragment) {
    const temp = document.createElement("div");
    temp.appendChild(fragment);
    return temp.textContent || "";
  }

  function buildClipboardPayload(rawSelection) {
    const parsed = parseSegments(rawSelection);
    const segments = enrichMathSegmentsFromText(parsed);
    const normalized = [];

    segments.forEach((segment) => {
      if (segment.type === "math") {
        if (shouldDemoteMathSegmentToText(segment.content)) {
          const demotedText = normalizeText(convertMathLikeLatexToText(segment.content));
          if (demotedText) {
            normalized.push({ type: "text", content: demotedText });
          }
          return;
        }

        const latex = normalizeMathLatex(segment.content);
        if (latex) {
          normalized.push({ type: "math", content: latex });
        }
      } else {
        const text = normalizeText(segment.content);
        if (text) {
          normalized.push({ type: "text", content: text });
        }
      }
    });

    if (normalized.length === 0) {
      return { plainText: "", htmlText: "", hasMath: false };
    }

    const boundaryCleaned = trimTextMathBoundaryDuplicates(normalized);
    const deduped = dedupeSegments(boundaryCleaned);

    const plainText = normalizeWhitespace(
      deduped
        .map((segment) =>
          segment.type === "math" ? mathToReadableText(segment.content) : segment.content
        )
        .join("")
    ).trim();

    const hasMath = deduped.some((segment) => segment.type === "math");
    return {
      plainText,
      htmlText: "",
      hasMath,
      segments: deduped
    };
  }

  function parseSegments(rawSelection) {
    const text = decodeHtmlEntities(rawSelection || "").replace(/\u00a0/g, " ");
    const output = [];
    let cursor = 0;

    while (cursor < text.length) {
      const start = text.indexOf(MATH_START, cursor);
      if (start < 0) {
        const tail = text.slice(cursor);
        if (tail) {
          output.push({ type: "text", content: tail });
        }
        break;
      }

      if (start > cursor) {
        output.push({ type: "text", content: text.slice(cursor, start) });
      }

      const contentStart = start + MATH_START.length;
      const end = text.indexOf(MATH_END, contentStart);
      if (end < 0) {
        output.push({ type: "text", content: text.slice(start) });
        break;
      }

      output.push({
        type: "math",
        content: text.slice(contentStart, end)
      });
      cursor = end + MATH_END.length;
    }

    if (output.length === 0) {
      const compact = text.trim();
      if (looksLikeMath(compact)) {
        return [{ type: "math", content: compact }];
      }
      return [{ type: "text", content: text }];
    }

    return output;
  }

  function enrichMathSegmentsFromText(segments) {
    const output = [];

    segments.forEach((segment) => {
      if (segment.type !== "text") {
        output.push(segment);
        return;
      }

      const parts = splitTextByLatexSpans(segment.content || "");
      if (parts.length === 0) {
        return;
      }
      parts.forEach((part) => output.push(part));
    });

    return output;
  }

  function splitTextByLatexSpans(text) {
    const raw = String(text || "");
    if (!raw) {
      return [];
    }

    const spans = extractLatexSpans(raw);
    if (spans.length === 0) {
      return [{ type: "text", content: raw }];
    }

    const output = [];
    let cursor = 0;

    spans.forEach((span) => {
      const adjusted = trimCitationSuffixFromMathSpan(raw, span.start, span.end);
      if (adjusted.start > cursor) {
        output.push({ type: "text", content: raw.slice(cursor, adjusted.start) });
      }

      if (adjusted.end > adjusted.start) {
        const mathText = raw.slice(adjusted.start, adjusted.end);
        output.push({ type: "math", content: mathText });
      }

      cursor = adjusted.end;
    });

    if (cursor < raw.length) {
      output.push({ type: "text", content: raw.slice(cursor) });
    }

    return output.filter((segment) => segment.content !== "");
  }

  function extractLatexSpans(text) {
    const spans = [];
    const regex = /\\[A-Za-z]+/g;
    let match = null;

    while ((match = regex.exec(text)) !== null) {
      const cmdStart = match.index;
      const cmdEnd = cmdStart + match[0].length;
      let start = cmdStart;
      let end = cmdEnd;

      while (start > 0 && isMathContextChar(text[start - 1])) {
        start -= 1;
      }
      while (end < text.length && isMathContextChar(text[end])) {
        end += 1;
      }

      if (end - start > 1) {
        spans.push({ start, end });
      }
    }

    if (spans.length === 0) {
      return [];
    }

    spans.sort((a, b) => a.start - b.start);
    const merged = [spans[0]];

    for (let i = 1; i < spans.length; i += 1) {
      const last = merged[merged.length - 1];
      const current = spans[i];
      if (current.start <= last.end) {
        last.end = Math.max(last.end, current.end);
      } else {
        merged.push(current);
      }
    }

    return merged;
  }

  function trimCitationSuffixFromMathSpan(raw, start, end) {
    let trimmedEnd = end;
    while (trimmedEnd > start) {
      const segment = raw.slice(start, trimmedEnd);
      const citationMatch = segment.match(
        /(?:\s*[,\uFF0C\u3001;]?\s*\[(?:\d+\s*(?:[-,\uFF0C\u3001]\s*\d+)*)\])+\s*$/u
      );
      if (!citationMatch) {
        break;
      }
      trimmedEnd -= citationMatch[0].length;
    }

    return { start, end: trimmedEnd };
  }

  function isMathContextChar(ch) {
    return /[A-Za-z0-9_\\^{}()[\].,+\-*/=<>|:\u03b1-\u03c9\u0391-\u03a9\u2200-\u22ff]/u.test(ch || "");
  }

  function buildHtmlClipboard(segments) {
    let hasMath = false;
    let hasOfficeMath = false;
    const paragraphs = [[]];
    const pushRaw = function (html) {
      if (!paragraphs[paragraphs.length - 1]) {
        paragraphs.push([]);
      }
      paragraphs[paragraphs.length - 1].push(html);
    };
    const nextParagraph = function () {
      if (paragraphs[paragraphs.length - 1].length === 0) {
        return;
      }
      paragraphs.push([]);
    };

    segments.forEach((segment) => {
      if (segment.type === "math") {
        const omml = latexToOMML(segment.content);
        if (omml) {
          hasMath = true;
          hasOfficeMath = true;
          pushRaw(omml);
          return;
        }

        const mathMl = latexToMathML(segment.content);
        if (mathMl) {
          hasMath = true;
          pushRaw(mathMl);
        } else {
          pushRaw(escapeHtml(segment.content));
        }
        return;
      }

      const pieces = String(segment.content || "").split("\n");
      for (let i = 0; i < pieces.length; i += 1) {
        const piece = pieces[i];
        if (piece) {
          pushRaw(escapeHtml(piece));
        }
        if (i < pieces.length - 1) {
          nextParagraph();
        }
      }
    });

    const body = paragraphs
      .filter((nodes) => nodes.length > 0)
      .map((nodes) => '<p class="MsoNormal">' + nodes.join("") + "</p>")
      .join("");

    if (!body) {
      return { html: "", hasMath: false };
    }

    const html =
      "<html " +
      'xmlns:o="urn:schemas-microsoft-com:office:office" ' +
      'xmlns:w="urn:schemas-microsoft-com:office:word" ' +
      'xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math">' +
      "<head>" +
      '<meta charset="utf-8"/>' +
      "<style>p.MsoNormal{margin:0;}</style>" +
      "</head><body><!--StartFragment-->" +
      body +
      "<!--EndFragment--></body></html>";

    return { html, hasMath, hasOfficeMath };
  }

  function exportPayloadToDocx(payload) {
    try {
      const segments = (payload && payload.segments) || [];
      if (segments.length === 0) {
        return false;
      }

      const docxBlob = buildDocxBlob(segments);
      if (!docxBlob) {
        return false;
      }

      const filename = buildDocxFilename();
      downloadBlob(docxBlob, filename);
      return true;
    } catch (error) {
      return false;
    }
  }

  function buildDocxFilename() {
    const now = new Date();
    const yyyy = String(now.getFullYear());
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const hh = String(now.getHours()).padStart(2, "0");
    const mi = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    return "latex-export-" + yyyy + mm + dd + "-" + hh + mi + ss + ".docx";
  }

  function buildDocxBlob(segments) {
    const documentXml = buildWordDocumentXml(segments);
    const createdAt = new Date().toISOString();
    const files = [
      { name: "[Content_Types].xml", data: buildContentTypesXml() },
      { name: "_rels/.rels", data: buildRootRelsXml() },
      { name: "docProps/core.xml", data: buildCorePropsXml(createdAt) },
      { name: "docProps/app.xml", data: buildAppPropsXml() },
      { name: "word/document.xml", data: documentXml },
      { name: "word/_rels/document.xml.rels", data: buildDocumentRelsXml() }
    ];

    return createZipBlob(files, "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
  }

  function buildWordDocumentXml(segments) {
    const paragraphs = segmentsToParagraphs(segments);
    const bodyXml = paragraphs.map(buildWordParagraphXml).join("");
    const safeBody = bodyXml || "<w:p><w:r><w:t xml:space=\"preserve\"></w:t></w:r></w:p>";

    return (
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" ' +
      'xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math">' +
      "<w:body>" +
      safeBody +
      "<w:sectPr>" +
      '<w:pgSz w:w="11906" w:h="16838"/>' +
      '<w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="708" w:footer="708" w:gutter="0"/>' +
      "</w:sectPr>" +
      "</w:body>" +
      "</w:document>"
    );
  }

  function segmentsToParagraphs(segments) {
    const paragraphs = [[]];
    const pushItem = function (item) {
      if (!paragraphs[paragraphs.length - 1]) {
        paragraphs.push([]);
      }
      paragraphs[paragraphs.length - 1].push(item);
    };
    const pushBreak = function () {
      if (paragraphs[paragraphs.length - 1].length === 0) {
        return;
      }
      paragraphs.push([]);
    };

    segments.forEach((segment) => {
      if (segment.type === "math") {
        pushItem({ type: "math", content: segment.content || "" });
        return;
      }

      const pieces = String(segment.content || "").split("\n");
      for (let i = 0; i < pieces.length; i += 1) {
        if (pieces[i]) {
          pushItem({ type: "text", content: pieces[i] });
        }
        if (i < pieces.length - 1) {
          pushBreak();
        }
      }
    });

    return paragraphs.filter((paragraph) => paragraph.length > 0);
  }

  function buildWordParagraphXml(items) {
    const inner = items
      .map((item) => {
        if (item.type === "math") {
          const omml = latexToOMML(item.content);
          if (omml) {
            return omml;
          }
          return buildWordTextRun(mathToReadableText(item.content));
        }
        return buildWordTextRun(item.content || "");
      })
      .join("");

    return "<w:p>" + (inner || "<w:r><w:t xml:space=\"preserve\"></w:t></w:r>") + "</w:p>";
  }

  function buildWordTextRun(text) {
    return "<w:r><w:t xml:space=\"preserve\">" + escapeXml(String(text || "")) + "</w:t></w:r>";
  }

  function buildContentTypesXml() {
    return (
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
      '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
      '<Default Extension="xml" ContentType="application/xml"/>' +
      '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>' +
      '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>' +
      '<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>' +
      "</Types>"
    );
  }

  function buildRootRelsXml() {
    return (
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>' +
      '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>' +
      '<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>' +
      "</Relationships>"
    );
  }

  function buildDocumentRelsXml() {
    return (
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"></Relationships>'
    );
  }

  function buildCorePropsXml(isoDate) {
    const when = escapeXml(isoDate);
    return (
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" ' +
      'xmlns:dc="http://purl.org/dc/elements/1.1/" ' +
      'xmlns:dcterms="http://purl.org/dc/terms/" ' +
      'xmlns:dcmitype="http://purl.org/dc/dcmitype/" ' +
      'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
      "<dc:title>LaTeX Export</dc:title>" +
      "<dc:creator>Latex Copy Helper</dc:creator>" +
      "<cp:lastModifiedBy>Latex Copy Helper</cp:lastModifiedBy>" +
      '<dcterms:created xsi:type="dcterms:W3CDTF">' +
      when +
      "</dcterms:created>" +
      '<dcterms:modified xsi:type="dcterms:W3CDTF">' +
      when +
      "</dcterms:modified>" +
      "</cp:coreProperties>"
    );
  }

  function buildAppPropsXml() {
    return (
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" ' +
      'xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">' +
      "<Application>Microsoft Office Word</Application>" +
      "</Properties>"
    );
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.style.display = "none";
    document.documentElement.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  }

  function createZipBlob(files, mimeType) {
    const encoder = new TextEncoder();
    const entries = files.map((file) => {
      const nameBytes = encoder.encode(file.name);
      const dataBytes =
        typeof file.data === "string" ? encoder.encode(file.data) : ensureUint8Array(file.data);
      return {
        nameBytes,
        dataBytes,
        crc32: computeCrc32(dataBytes),
        offset: 0
      };
    });

    let offset = 0;
    const localParts = [];
    const centralParts = [];

    entries.forEach((entry) => {
      entry.offset = offset;

      const localHeader = new Uint8Array(30 + entry.nameBytes.length);
      const localView = new DataView(localHeader.buffer);
      localView.setUint32(0, 0x04034b50, true);
      localView.setUint16(4, 20, true);
      localView.setUint16(6, 0, true);
      localView.setUint16(8, 0, true);
      localView.setUint16(10, 0, true);
      localView.setUint16(12, 0, true);
      localView.setUint32(14, entry.crc32, true);
      localView.setUint32(18, entry.dataBytes.length, true);
      localView.setUint32(22, entry.dataBytes.length, true);
      localView.setUint16(26, entry.nameBytes.length, true);
      localView.setUint16(28, 0, true);
      localHeader.set(entry.nameBytes, 30);

      localParts.push(localHeader);
      localParts.push(entry.dataBytes);
      offset += localHeader.length + entry.dataBytes.length;

      const centralHeader = new Uint8Array(46 + entry.nameBytes.length);
      const centralView = new DataView(centralHeader.buffer);
      centralView.setUint32(0, 0x02014b50, true);
      centralView.setUint16(4, 20, true);
      centralView.setUint16(6, 20, true);
      centralView.setUint16(8, 0, true);
      centralView.setUint16(10, 0, true);
      centralView.setUint16(12, 0, true);
      centralView.setUint16(14, 0, true);
      centralView.setUint32(16, entry.crc32, true);
      centralView.setUint32(20, entry.dataBytes.length, true);
      centralView.setUint32(24, entry.dataBytes.length, true);
      centralView.setUint16(28, entry.nameBytes.length, true);
      centralView.setUint16(30, 0, true);
      centralView.setUint16(32, 0, true);
      centralView.setUint16(34, 0, true);
      centralView.setUint16(36, 0, true);
      centralView.setUint32(38, 0, true);
      centralView.setUint32(42, entry.offset, true);
      centralHeader.set(entry.nameBytes, 46);

      centralParts.push(centralHeader);
    });

    const centralDirectorySize = sumByteLengths(centralParts);
    const centralDirectoryOffset = offset;

    const endRecord = new Uint8Array(22);
    const endView = new DataView(endRecord.buffer);
    endView.setUint32(0, 0x06054b50, true);
    endView.setUint16(4, 0, true);
    endView.setUint16(6, 0, true);
    endView.setUint16(8, entries.length, true);
    endView.setUint16(10, entries.length, true);
    endView.setUint32(12, centralDirectorySize, true);
    endView.setUint32(16, centralDirectoryOffset, true);
    endView.setUint16(20, 0, true);

    return new Blob(
      []
        .concat(localParts)
        .concat(centralParts)
        .concat([endRecord]),
      { type: mimeType || "application/zip" }
    );
  }

  function ensureUint8Array(value) {
    if (value instanceof Uint8Array) {
      return value;
    }
    if (value instanceof ArrayBuffer) {
      return new Uint8Array(value);
    }
    return new Uint8Array(0);
  }

  function sumByteLengths(parts) {
    return parts.reduce((total, part) => total + (part ? part.length : 0), 0);
  }

  function computeCrc32(bytes) {
    let crc = 0xffffffff;
    const table = getCrc32Table();
    for (let i = 0; i < bytes.length; i += 1) {
      crc = (crc >>> 8) ^ table[(crc ^ bytes[i]) & 0xff];
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  let crc32TableCache = null;
  function getCrc32Table() {
    if (crc32TableCache) {
      return crc32TableCache;
    }

    const table = new Uint32Array(256);
    for (let i = 0; i < 256; i += 1) {
      let c = i;
      for (let j = 0; j < 8; j += 1) {
        if (c & 1) {
          c = 0xedb88320 ^ (c >>> 1);
        } else {
          c = c >>> 1;
        }
      }
      table[i] = c >>> 0;
    }

    crc32TableCache = table;
    return table;
  }

  function dedupeSegments(segments) {
    const output = [];

    segments.forEach((segment) => {
      const content = segment.content || "";
      if (!content) {
        return;
      }

      const candidate = { type: segment.type, content };
      const prev = output.length > 0 ? output[output.length - 1] : null;

      if (!prev) {
        output.push(candidate);
        return;
      }

      if (prev.type === "math" && candidate.type === "math") {
        if (canonicalMathToken(prev.content) === canonicalMathToken(candidate.content)) {
          return;
        }
        output.push(candidate);
        return;
      }

      if (prev.type !== candidate.type) {
        const prevToken = prev.type === "math" ? canonicalMathToken(prev.content) : canonicalTextMathToken(prev.content);
        const currToken =
          candidate.type === "math"
            ? canonicalMathToken(candidate.content)
            : canonicalTextMathToken(candidate.content);

        if (prevToken && currToken && prevToken === currToken) {
          if (prev.type === "text" && candidate.type === "math") {
            output[output.length - 1] = candidate;
          }
          return;
        }
      }

      output.push(candidate);
    });

    return output;
  }

  function trimTextMathBoundaryDuplicates(segments) {
    const output = segments
      .map((segment) => ({
        type: segment.type,
        content: segment.content || ""
      }))
      .filter((segment) => segment.content !== "");

    for (let i = 0; i < output.length; i += 1) {
      if (output[i].type !== "math") {
        continue;
      }

      const mathToken = canonicalMathToken(output[i].content);
      if (!mathToken) {
        continue;
      }

      if (i > 0 && output[i - 1].type === "text") {
        const tail = extractTrailingMathToken(output[i - 1].content);
        if (tail && canonicalizeMathLikeText(tail, false) === mathToken) {
          output[i - 1].content = output[i - 1].content.slice(
            0,
            output[i - 1].content.length - tail.length
          );
        }
      }

      if (i + 1 < output.length && output[i + 1].type === "text") {
        const head = extractLeadingMathToken(output[i + 1].content);
        if (head && canonicalizeMathLikeText(head, false) === mathToken) {
          output[i + 1].content = output[i + 1].content.slice(head.length);
        }
      }
    }

    return output.filter((segment) => segment.content !== "");
  }

  function extractTrailingMathToken(text) {
    const raw = String(text || "");
    const match = raw.match(/([\\A-Za-z0-9_^{}()[\].,+\-*/=<>|:\u03b1-\u03c9\u0391-\u03a9\u2200-\u22ff]+)\s*$/u);
    if (!match) {
      return "";
    }
    const token = match[1] || "";
    return isLikelyMathToken(token) ? token : "";
  }

  function extractLeadingMathToken(text) {
    const raw = String(text || "");
    const match = raw.match(/^\s*([\\A-Za-z0-9_^{}()[\].,+\-*/=<>|:\u03b1-\u03c9\u0391-\u03a9\u2200-\u22ff]+)/u);
    if (!match) {
      return "";
    }
    const token = match[1] || "";
    return isLikelyMathToken(token) ? token : "";
  }

  function canonicalMathToken(raw) {
    const normalized = normalizeMathLatex(raw || "");
    return canonicalizeMathLikeText(normalized, true);
  }

  function canonicalTextMathToken(raw) {
    const compact = normalizeWhitespace((raw || "").trim());
    if (!compact || compact.length > 80 || compact.includes("\n")) {
      return "";
    }
    if (!looksLikeMath(compact) && !/[\u03b1-\u03c9\u0391-\u03a9]/.test(compact)) {
      return "";
    }
    return canonicalizeMathLikeText(compact, false);
  }

  function canonicalizeMathLikeText(raw, isLatex) {
    let text = String(raw || "");

    Object.entries(GREEK_CHAR_TO_NAME).forEach(([ch, name]) => {
      text = text.split(ch).join(name);
    });

    text = text.replace(/\\([A-Za-z]+)/g, function (_, name) {
      return name;
    });

    if (isLatex) {
      text = text.replace(/[{}_^]/g, "");
    }

    text = text.replace(/[^A-Za-z0-9]/g, "");
    return text.toLowerCase();
  }

  function normalizeMathLatex(input) {
    let text = cleanLatexText(input || "");
    text = stripMathDelimiters(text);
    text = normalizeLatexCommands(text);
    text = replaceUnicodeSymbols(text);
    text = normalizeImplicitGreekSubscripts(text);
    text = collapseRepeatedMathExpression(text);
    text = normalizeWhitespace(text);
    return text.trim();
  }

  function normalizeText(input) {
    return (input || "").replace(/\u00a0/g, " ");
  }

  function shouldDemoteMathSegmentToText(input) {
    const raw = cleanLatexText(input || "");
    if (!raw || raw.indexOf("\\") < 0) {
      return false;
    }

    if (/[{}_^]/.test(raw)) {
      return false;
    }

    if (
      /\\(frac|dfrac|tfrac|sqrt|sum|prod|int|lim|log|ln|sin|cos|tan|exp|cdot|times|div|leq|geq|neq|infty|mu|sigma|alpha|beta|gamma|delta|theta|lambda|phi|psi|omega)\b/.test(
        raw
      )
    ) {
      return false;
    }

    const plain = convertMathLikeLatexToText(raw);
    const words = plain
      .split(/[^A-Za-z]+/)
      .filter((word) => word.length >= 4);

    const hasArrowCommand = /\\(to|rightarrow|leftarrow|leftrightarrow|Rightarrow|Leftarrow|Leftrightarrow|arrow|rarrow|larrow)\b/.test(
      raw
    );

    return hasArrowCommand && words.length >= 2;
  }

  function convertMathLikeLatexToText(input) {
    let text = String(input || "");
    text = text.replace(/\\(rightarrow|to|arrow|rarrow)\b/g, " \u2192 ");
    text = text.replace(/\\(leftarrow|larrow)\b/g, " \u2190 ");
    text = text.replace(/\\leftrightarrow\b/g, " \u2194 ");
    text = text.replace(/\\Rightarrow\b/g, " \u21d2 ");
    text = text.replace(/\\Leftarrow\b/g, " \u21d0 ");
    text = text.replace(/\\Leftrightarrow\b/g, " \u21d4 ");
    text = text.replace(/\\quad\b/g, " ");
    text = text.replace(/\\qquad\b/g, "  ");
    text = text.replace(/\\[,;:!]/g, " ");
    text = text.replace(/\\ /g, " ");
    return normalizeWhitespace(text);
  }

  function normalizeLatexCommands(text) {
    let output = text;
    output = output.replace(/\\dfrac\b/g, "\\frac");
    output = output.replace(/\\tfrac\b/g, "\\frac");
    output = output.replace(/\\dbinom\b/g, "\\binom");
    output = output.replace(/\\tbinom\b/g, "\\binom");
    output = output.replace(/\\operatorname\*/g, "\\operatorname");
    output = output.replace(/\\(?:left|right|middle)\s*\./g, "");
    output = output.replace(/\\(?:big|Big|bigg|Bigg)(?:l|r|m)?\s*\./g, "");
    output = output.replace(/\\displaystyle\b/g, "");
    output = output.replace(/\\textstyle\b/g, "");
    output = output.replace(/\\left\s*/g, "");
    output = output.replace(/\\right\s*/g, "");
    output = output.replace(/\\(?:big|Big|bigg|Bigg)(?:l|r|m)?\b\s*/g, "");
    output = output.replace(/\\middle\s*/g, "");
    return output;
  }

  function replaceUnicodeSymbols(text) {
    let output = text;

    Object.entries(UNICODE_TO_LATEX).forEach(([symbol, latex]) => {
      output = output.split(symbol).join(latex);
    });

    Object.entries(GREEK_TO_LATEX).forEach(([symbol, latex]) => {
      output = output.split(symbol).join(latex);
    });

    output = output.replace(/\u221a\s*([A-Za-z0-9]+)/g, "\\sqrt{$1}");
    return output;
  }

  function normalizeImplicitGreekSubscripts(text) {
    const greekCmds =
      "alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega";
    const re = new RegExp("\\\\(" + greekCmds + ")([a-z]{1,3})(?=[^A-Za-z]|$)", "g");
    return String(text || "").replace(re, "\\\\$1_{$2}");
  }

  function collapseRepeatedMathExpression(text) {
    const raw = String(text || "");
    const compact = raw.replace(/\s+/g, "");
    if (!compact) {
      return raw;
    }

    if (!compact.includes("\\") && !/[\u03b1-\u03c9\u0391-\u03a9]/u.test(compact)) {
      return raw;
    }

    const unit = findRepeatingMathUnit(compact);
    if (!unit) {
      return raw;
    }

    return unit;
  }

  function findRepeatingMathUnit(text) {
    const n = text.length;
    for (let len = 1; len <= Math.floor(n / 2); len += 1) {
      if (n % len !== 0) {
        continue;
      }

      const count = n / len;
      if (count < 2) {
        continue;
      }

      const unit = text.slice(0, len);
      if (!looksLikeMath(unit)) {
        continue;
      }

      let ok = true;
      for (let i = len; i < n; i += len) {
        if (text.slice(i, i + len) !== unit) {
          ok = false;
          break;
        }
      }

      if (ok) {
        return unit;
      }
    }
    return "";
  }

  function normalizeWhitespace(text) {
    let output = text || "";
    output = output.replace(/[ \t]+/g, " ");
    output = output.replace(/ *\n */g, "\n");
    output = output.replace(/\n{3,}/g, "\n\n");
    output = collapseRepeatedMathTokens(output);
    return output;
  }

  function collapseRepeatedMathTokens(text) {
    const parts = String(text || "").split(/(\s+)/);
    const output = [];
    let prevCanonical = "";

    for (let i = 0; i < parts.length; i += 1) {
      const part = parts[i];
      if (!part) {
        continue;
      }

      if (/^\s+$/.test(part)) {
        output.push(part);
        continue;
      }

      const canonical = canonicalShortMathToken(part);
      if (canonical && prevCanonical && canonical === prevCanonical) {
        continue;
      }

      output.push(part);
      prevCanonical = canonical || "";
    }

    return output.join("");
  }

  function canonicalShortMathToken(token) {
    const raw = String(token || "").trim();
    if (!raw || raw.length > 80) {
      return "";
    }

    if (!isLikelyMathToken(raw)) {
      return "";
    }

    return canonicalizeMathLikeText(raw, raw.includes("\\"));
  }

  function isLikelyMathToken(token) {
    return /[\\_^(){}\[\]0-9+\-*/=]|[\u03b1-\u03c9\u0391-\u03a9\u2200-\u22ff]/.test(token);
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
    return /\\[A-Za-z]+|[_^{}]|[\u03b1-\u03c9\u0391-\u03a9]|[\u2211\u220f\u222b\u221a\u2264\u2265\u2260\u221e]/.test(
      text || ""
    );
  }

  function decodeHtmlEntities(text) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  }

  function latexToMathML(latex) {
    const source = normalizeMathLatex(latex);
    if (!source) {
      return "";
    }

    try {
      const parser = createLatexParser(source);
      const node = parser.parseExpression([]);
      parser.skipSpaces();
      if (!parser.isEnd()) {
        return "";
      }

      return (
        '<math xmlns="http://www.w3.org/1998/Math/MathML">' +
        serializeMathNode(node) +
        "</math>"
      );
    } catch (error) {
      return "";
    }
  }

  function latexToOMML(latex) {
    const source = normalizeMathLatex(latex);
    if (!source) {
      return "";
    }

    try {
      const parser = createLatexParser(source);
      const node = parser.parseExpression([]);
      parser.skipSpaces();
      if (!parser.isEnd()) {
        return "";
      }

      return "<m:oMath>" + serializeOMMLArg(node) + "</m:oMath>";
    } catch (error) {
      return "";
    }
  }

  function mathToReadableText(latex) {
    const source = normalizeMathLatex(latex);
    if (!source) {
      return "";
    }

    try {
      const parser = createLatexParser(source);
      const node = parser.parseExpression([]);
      parser.skipSpaces();
      if (!parser.isEnd()) {
        return source;
      }
      return serializeReadableMath(node);
    } catch (error) {
      return source;
    }
  }

  function createLatexParser(source) {
    let index = 0;

    function isEnd() {
      return index >= source.length;
    }

    function peek(offset) {
      return source[index + (offset || 0)] || "";
    }

    function next() {
      const ch = source[index] || "";
      index += 1;
      return ch;
    }

    function skipSpaces() {
      while (!isEnd() && /\s/.test(peek())) {
        index += 1;
      }
    }

    function parseExpression(stops) {
      const children = [];

      while (!isEnd()) {
        skipSpaces();
        if (isEnd()) {
          break;
        }

        const ch = peek();
        if (ch === "}") {
          break;
        }
        if (stops.length > 0 && stops.includes(ch)) {
          break;
        }

        const atom = parseAtom();
        if (!atom) {
          if (isEnd()) {
            break;
          }
          next();
          continue;
        }

        children.push(atom);
      }

      return { type: "mrow", children };
    }

    function parseAtom() {
      const base = parseBase();
      if (!base) {
        return null;
      }
      return parseScripts(base);
    }

    function parseBase() {
      skipSpaces();
      if (isEnd()) {
        return null;
      }

      const ch = peek();
      if (ch === "{") {
        next();
        const group = parseExpression(["}"]);
        if (peek() === "}") {
          next();
        }
        return group;
      }

      if (ch === "\\") {
        return parseCommand();
      }

      if (ch === "}") {
        return null;
      }

      next();
      return parseChar(ch);
    }

    function parseScripts(base) {
      let sub = null;
      let sup = null;

      while (true) {
        skipSpaces();
        const ch = peek();
        if (ch !== "_" && ch !== "^") {
          break;
        }

        next();
        const arg = parseScriptArgument();
        if (!arg) {
          continue;
        }

        if (ch === "_") {
          sub = arg;
        } else {
          sup = arg;
        }
      }

      if (sub && sup) {
        return { type: "msubsup", base, sub, sup };
      }
      if (sub) {
        return { type: "msub", base, sub };
      }
      if (sup) {
        return { type: "msup", base, sup };
      }
      return base;
    }

    function parseScriptArgument() {
      skipSpaces();
      if (isEnd()) {
        return null;
      }

      if (peek() === "{") {
        next();
        const expression = parseExpression(["}"]);
        if (peek() === "}") {
          next();
        }
        return expression;
      }

      // In TeX, an unbraced sub/superscript consumes exactly one atom.
      // A following ^ or _ belongs to the outer expression, not this argument.
      return parseBase();
    }

    function parseCommand() {
      next();

      if (isEnd()) {
        return { type: "mtext", text: "\\" };
      }

      let name = "";
      while (!isEnd() && /[A-Za-z]/.test(peek())) {
        name += next();
      }

      if (!name) {
        name = next();
      }

      if (IGNORED_LATEX_COMMANDS.has(name)) {
        return null;
      }

      if (name === "frac") {
        const numerator = parseRequiredArg();
        const denominator = parseRequiredArg();
        return {
          type: "mfrac",
          numerator: numerator || emptyNode(),
          denominator: denominator || emptyNode()
        };
      }

      if (name === "sqrt") {
        skipSpaces();
        if (peek() === "[") {
          consumeBracket();
        }
        const body = parseRequiredArg();
        return { type: "msqrt", body: body || emptyNode() };
      }

      if (name === "binom") {
        const numerator = parseRequiredArg();
        const denominator = parseRequiredArg();
        return {
          type: "mbinom",
          numerator: numerator || emptyNode(),
          denominator: denominator || emptyNode()
        };
      }

      if (name === "overset" || name === "stackrel") {
        const over = parseRequiredArg();
        const base = parseRequiredArg();
        return {
          type: "moverset",
          base: base || emptyNode(),
          over: over || emptyNode()
        };
      }

      if (name === "underset") {
        const under = parseRequiredArg();
        const base = parseRequiredArg();
        return {
          type: "munderset",
          base: base || emptyNode(),
          under: under || emptyNode()
        };
      }

      if (LATEX_ACCENT_COMMANDS[name]) {
        const accent = LATEX_ACCENT_COMMANDS[name];
        const body = parseRequiredArg();
        return {
          type: "maccent",
          body: body || emptyNode(),
          mathmlAccent: accent.mathml,
          ommlAccent: accent.omml,
          readableName: accent.readable
        };
      }

      if (name === "overline" || name === "bar") {
        const body = parseRequiredArg();
        return { type: "mbar", body: body || emptyNode() };
      }

      if (name === "not") {
        const negated = consumeNegatedOperator();
        if (negated) {
          return { type: "mo", text: negated };
        }
        return { type: "mo", text: "\u0338" };
      }

      if (name === "underline") {
        const body = parseRequiredArg();
        return { type: "munderline", body: body || emptyNode() };
      }

      if (name === "overbrace" || name === "underbrace") {
        const body = parseRequiredArg();
        const isOver = name === "overbrace";
        return {
          type: "mgroupchr",
          body: body || emptyNode(),
          mathmlChar: isOver ? "\u23de" : "\u23df",
          ommlChar: isOver ? "\u23de" : "\u23df",
          position: isOver ? "top" : "bottom",
          readableName: name
        };
      }

      if (name === "quad") {
        return { type: "mspace", width: "1em", text: " " };
      }

      if (name === "qquad") {
        return { type: "mspace", width: "2em", text: "  " };
      }

      if (name === " ") {
        return { type: "mspace", width: "0.333em", text: " " };
      }

      if (name === "text" || name === "mathrm" || name === "operatorname") {
        const raw = parseRawGroupText();
        return { type: "mtext", text: raw };
      }

      if (name === "mathit" || name === "mathnormal") {
        return parseRequiredArg() || emptyNode();
      }

      if (name === "mathsf") {
        return applyMathStyleNode(parseRequiredArg() || emptyNode(), "sans-serif");
      }

      if (name === "mathtt") {
        return applyMathStyleNode(parseRequiredArg() || emptyNode(), "monospace");
      }

      if (name === "mathbf" || name === "boldsymbol" || name === "bm") {
        return applyMathStyleNode(parseRequiredArg() || emptyNode(), "bold");
      }

      if (name === "mathbb") {
        return applyMathStyleNode(parseRequiredArg() || emptyNode(), "double-struck");
      }

      if (name === "mathcal" || name === "mathscr") {
        return applyMathStyleNode(parseRequiredArg() || emptyNode(), "script");
      }

      if (name === "begin") {
        return parseEnvironment(parseRawGroupText());
      }

      if (name === "end") {
        parseRawGroupText();
        return null;
      }

      if (name === "left" || name === "right") {
        return null;
      }

      if (LATEX_CMD_TO_CHAR[name]) {
        return { type: "mi", text: LATEX_CMD_TO_CHAR[name] };
      }

      if (LATEX_CMD_TO_OPERATOR[name]) {
        return { type: "mo", text: LATEX_CMD_TO_OPERATOR[name] };
      }

      if (name === ",") {
        return { type: "mspace", width: "0.1667em", text: " " };
      }

      if (name === ":") {
        return { type: "mspace", width: "0.2222em", text: " " };
      }

      if (name === ";") {
        return { type: "mspace", width: "0.2778em", text: " " };
      }

      if (name === "!") {
        return null;
      }

      if (name === "\\") {
        return { type: "mo", text: "|" };
      }

      return { type: "mi", text: name };
    }

    function parseRequiredArg() {
      skipSpaces();
      if (isEnd()) {
        return null;
      }

      if (peek() === "{") {
        next();
        const expression = parseExpression(["}"]);
        if (peek() === "}") {
          next();
        }
        return expression;
      }

      const base = parseBase();
      return base ? parseScripts(base) : null;
    }

    function parseRawGroupText() {
      skipSpaces();
      if (peek() !== "{") {
        return "";
      }

      next();
      let depth = 1;
      let text = "";

      while (!isEnd() && depth > 0) {
        const ch = next();
        if (ch === "{") {
          depth += 1;
          text += ch;
        } else if (ch === "}") {
          depth -= 1;
          if (depth > 0) {
            text += ch;
          }
        } else if (ch === "\\" && !isEnd()) {
          const escaped = next();
          if (escaped === " " || escaped === "," || escaped === ";" || escaped === ":" || escaped === "!") {
            text += " ";
          } else {
            text += escaped;
          }
        } else {
          text += ch;
        }
      }

      return text;
    }

    function consumeBracket() {
      if (peek() !== "[") {
        return;
      }

      let depth = 0;
      while (!isEnd()) {
        const ch = next();
        if (ch === "[") {
          depth += 1;
        } else if (ch === "]") {
          depth -= 1;
          if (depth <= 0) {
            break;
          }
        }
      }
    }

    function consumeNegatedOperator() {
      skipSpaces();
      if (isEnd()) {
        return "";
      }

      const direct = LATEX_NOT_TO_OPERATOR[peek()] || "";
      if (direct) {
        next();
        return direct;
      }

      if (peek() !== "\\") {
        return "";
      }

      let tempIndex = index + 1;
      let name = "";
      while (tempIndex < source.length && /[A-Za-z]/.test(source[tempIndex])) {
        name += source[tempIndex];
        tempIndex += 1;
      }

      if (!name && tempIndex < source.length) {
        name = source[tempIndex];
        tempIndex += 1;
      }

      const mapped = LATEX_NOT_TO_OPERATOR[name] || "";
      if (!mapped) {
        return "";
      }

      index = tempIndex;
      return mapped;
    }

    function parseEnvironment(name) {
      return parseMathEnvironment(name, readEnvironmentBody(name));
    }

    function readEnvironmentBody(name) {
      const parts = [];
      const stack = [];

      while (!isEnd()) {
        const directive = readLatexEnvironmentDirective(source, index);
        if (directive) {
          index += directive.raw.length;

          if (directive.kind === "begin") {
            stack.push(directive.name);
            parts.push(directive.raw);
            continue;
          }

          if (stack.length === 0 && directive.name === name) {
            return parts.join("");
          }

          if (stack.length > 0 && stack[stack.length - 1] === directive.name) {
            stack.pop();
          }
          parts.push(directive.raw);
          continue;
        }

        parts.push(next());
      }

      return parts.join("");
    }

    function parseChar(ch) {
      if (/[0-9]/.test(ch)) {
        return { type: "mn", text: ch };
      }

      if (/[A-Za-z]/.test(ch)) {
        return { type: "mi", text: ch };
      }

      if (/[\u03b1-\u03c9\u0391-\u03a9]/.test(ch)) {
        return { type: "mi", text: ch };
      }

      if (/[+\-=*/(),.[\]<>|]/.test(ch)) {
        return { type: "mo", text: ch };
      }

      return { type: "mtext", text: ch };
    }

    return {
      isEnd,
      parseExpression,
      skipSpaces
    };
  }

  function applyMathStyleNode(node, style) {
    if (!node) {
      return emptyNode();
    }

    if (node.type === "mrow") {
      return {
        type: "mrow",
        children: (node.children || []).map((child) => applyMathStyleNode(child, style))
      };
    }

    if (node.type === "mi" || node.type === "mn" || node.type === "mtext") {
      return {
        type: node.type,
        text: applyMathStyleText(node.text || "", style)
      };
    }

    if (node.type === "mfrac") {
      return {
        type: "mfrac",
        numerator: applyMathStyleNode(node.numerator, style),
        denominator: applyMathStyleNode(node.denominator, style)
      };
    }

    if (node.type === "mbinom") {
      return {
        type: "mbinom",
        numerator: applyMathStyleNode(node.numerator, style),
        denominator: applyMathStyleNode(node.denominator, style)
      };
    }

    if (node.type === "moverset") {
      return {
        type: "moverset",
        base: applyMathStyleNode(node.base, style),
        over: applyMathStyleNode(node.over, style)
      };
    }

    if (node.type === "munderset") {
      return {
        type: "munderset",
        base: applyMathStyleNode(node.base, style),
        under: applyMathStyleNode(node.under, style)
      };
    }

    if (node.type === "msqrt") {
      return {
        type: "msqrt",
        body: applyMathStyleNode(node.body, style)
      };
    }

    if (node.type === "maccent") {
      return {
        type: "maccent",
        body: applyMathStyleNode(node.body, style),
        mathmlAccent: node.mathmlAccent || "",
        ommlAccent: node.ommlAccent || "",
        readableName: node.readableName || ""
      };
    }

    if (node.type === "mbar") {
      return {
        type: "mbar",
        body: applyMathStyleNode(node.body, style)
      };
    }

    if (node.type === "munderline") {
      return {
        type: "munderline",
        body: applyMathStyleNode(node.body, style)
      };
    }

    if (node.type === "mgroupchr") {
      return {
        type: "mgroupchr",
        body: applyMathStyleNode(node.body, style),
        mathmlChar: node.mathmlChar || "",
        ommlChar: node.ommlChar || "",
        position: node.position || "top",
        readableName: node.readableName || ""
      };
    }

    if (node.type === "msub") {
      return {
        type: "msub",
        base: applyMathStyleNode(node.base, style),
        sub: applyMathStyleNode(node.sub, style)
      };
    }

    if (node.type === "msup") {
      return {
        type: "msup",
        base: applyMathStyleNode(node.base, style),
        sup: applyMathStyleNode(node.sup, style)
      };
    }

    if (node.type === "msubsup") {
      return {
        type: "msubsup",
        base: applyMathStyleNode(node.base, style),
        sub: applyMathStyleNode(node.sub, style),
        sup: applyMathStyleNode(node.sup, style)
      };
    }

    if (node.type === "mtable") {
      return {
        type: "mtable",
        rows: (node.rows || []).map((row) => row.map((cell) => applyMathStyleNode(cell, style))),
        leftDelimiter: node.leftDelimiter || "",
        rightDelimiter: node.rightDelimiter || ""
      };
    }

    return node;
  }

  function applyMathStyleText(text, style) {
    return Array.from(String(text || ""))
      .map((ch) => {
        const codePoint = getStyledCodePoint(ch, style);
        return codePoint ? String.fromCodePoint(codePoint) : ch;
      })
      .join("");
  }

  function getStyledCodePoint(ch, style) {
    if (!ch) {
      return 0;
    }

    const code = ch.codePointAt(0);
    if (typeof code !== "number") {
      return 0;
    }

    if (style === "bold") {
      if (code >= 0x41 && code <= 0x5a) {
        return 0x1d400 + (code - 0x41);
      }
      if (code >= 0x61 && code <= 0x7a) {
        return 0x1d41a + (code - 0x61);
      }
      if (code >= 0x30 && code <= 0x39) {
        return 0x1d7ce + (code - 0x30);
      }
      return 0;
    }

    if (style === "script") {
      if (code >= 0x41 && code <= 0x5a) {
        return SCRIPT_STYLE_CODEPOINTS.upper[ch] || 0;
      }
      if (code >= 0x61 && code <= 0x7a) {
        return SCRIPT_STYLE_CODEPOINTS.lower[ch] || 0;
      }
      return 0;
    }

    if (style === "double-struck") {
      if (code >= 0x41 && code <= 0x5a) {
        return DOUBLE_STRUCK_STYLE_CODEPOINTS.upper[ch] || 0;
      }
      if (code >= 0x61 && code <= 0x7a) {
        return 0x1d552 + (code - 0x61);
      }
      if (code >= 0x30 && code <= 0x39) {
        return 0x1d7d8 + (code - 0x30);
      }
      return 0;
    }

    if (style === "sans-serif") {
      if (code >= 0x41 && code <= 0x5a) {
        return 0x1d5a0 + (code - 0x41);
      }
      if (code >= 0x61 && code <= 0x7a) {
        return 0x1d5ba + (code - 0x61);
      }
      if (code >= 0x30 && code <= 0x39) {
        return 0x1d7e2 + (code - 0x30);
      }
      return 0;
    }

    if (style === "monospace") {
      if (code >= 0x41 && code <= 0x5a) {
        return 0x1d670 + (code - 0x41);
      }
      if (code >= 0x61 && code <= 0x7a) {
        return 0x1d68a + (code - 0x61);
      }
      if (code >= 0x30 && code <= 0x39) {
        return 0x1d7f6 + (code - 0x30);
      }
      return 0;
    }

    return 0;
  }

  function parseMathEnvironment(name, content) {
    const envName = String(name || "").trim();
    if (!envName) {
      return emptyNode();
    }

    if (Object.prototype.hasOwnProperty.call(MATRIX_ENVIRONMENT_DELIMITERS, envName)) {
      const delimiters = MATRIX_ENVIRONMENT_DELIMITERS[envName];
      const rows = splitLatexTableRows(content).map((row) =>
        splitLatexTableCells(row).map((cell) => parseLatexFragment(cell))
      );

      return {
        type: "mtable",
        rows: rows.length > 0 ? rows : [[emptyNode()]],
        leftDelimiter: delimiters.left,
        rightDelimiter: delimiters.right
      };
    }

    return parseLatexFragment(content);
  }

  function parseLatexFragment(fragment) {
    const parser = createLatexParser(fragment || "");
    const node = parser.parseExpression([]);
    parser.skipSpaces();
    return node || emptyNode();
  }

  function splitLatexTableRows(raw) {
    return splitLatexAtTopLevel(raw, function (text, index, state) {
      return (
        text[index] === "\\" &&
        text[index + 1] === "\\" &&
        state.braceDepth === 0 &&
        state.environmentDepth === 0
      );
    });
  }

  function splitLatexTableCells(raw) {
    return splitLatexAtTopLevel(raw, function (text, index, state) {
      return text[index] === "&" && state.braceDepth === 0 && state.environmentDepth === 0;
    });
  }

  function splitLatexAtTopLevel(raw, isSeparator) {
    const text = String(raw || "");
    const parts = [];
    const state = {
      braceDepth: 0,
      environmentDepth: 0
    };

    let current = "";
    let index = 0;

    while (index < text.length) {
      const directive = readLatexEnvironmentDirective(text, index);
      if (directive) {
        if (directive.kind === "begin") {
          state.environmentDepth += 1;
        } else if (state.environmentDepth > 0) {
          state.environmentDepth -= 1;
        }
        current += directive.raw;
        index += directive.raw.length;
        continue;
      }

      const ch = text[index];
      if (ch === "{") {
        state.braceDepth += 1;
      } else if (ch === "}" && state.braceDepth > 0) {
        state.braceDepth -= 1;
      }

      if (isSeparator(text, index, state)) {
        parts.push(current.trim());
        current = "";
        index += text[index] === "&" ? 1 : 2;
        while (index < text.length && /\s/.test(text[index])) {
          index += 1;
        }
        continue;
      }

      current += ch;
      index += 1;
    }

    if (current.trim() || parts.length === 0) {
      parts.push(current.trim());
    }

    return parts.filter((part) => part !== "");
  }

  function readLatexEnvironmentDirective(text, index) {
    const match = String(text || "")
      .slice(index)
      .match(/^\\(begin|end)\{([^}]*)\}/);

    if (!match) {
      return null;
    }

    return {
      kind: match[1],
      name: match[2] || "",
      raw: match[0]
    };
  }

  function buildMathMLTable(node) {
    const rows = (node.rows || [])
      .map(function (row) {
        const cells = (row || [])
          .map(function (cell) {
            return "<mtd>" + serializeMathNode(cell) + "</mtd>";
          })
          .join("");
        return "<mtr>" + cells + "</mtr>";
      })
      .join("");

    const table = "<mtable>" + rows + "</mtable>";
    if (!node.leftDelimiter && !node.rightDelimiter) {
      return table;
    }

    return (
      '<mfenced open="' +
      escapeXml(node.leftDelimiter || "") +
      '" close="' +
      escapeXml(node.rightDelimiter || "") +
      '">' +
      table +
      "</mfenced>"
    );
  }

  function buildOMMLTable(node) {
    const rows = (node.rows || [])
      .map(function (row) {
        const cells = (row || [])
          .map(function (cell) {
            return "<m:e>" + serializeOMMLArg(cell) + "</m:e>";
          })
          .join("");
        return "<m:mr>" + cells + "</m:mr>";
      })
      .join("");

    const matrix = "<m:m>" + rows + "</m:m>";
    if (!node.leftDelimiter && !node.rightDelimiter) {
      return matrix;
    }

    return (
      "<m:d>" +
      "<m:dPr>" +
      '<m:begChr m:val="' +
      escapeXml(node.leftDelimiter || "") +
      '"/>' +
      '<m:endChr m:val="' +
      escapeXml(node.rightDelimiter || "") +
      '"/>' +
      "</m:dPr>" +
      "<m:e>" +
      matrix +
      "</m:e>" +
      "</m:d>"
    );
  }

  function serializeMathNode(node) {
    if (!node) {
      return "<mrow></mrow>";
    }

    if (node.type === "mrow") {
      const inner = (node.children || []).map(serializeMathNode).join("");
      return "<mrow>" + inner + "</mrow>";
    }

    if (node.type === "mi") {
      return "<mi>" + escapeXml(node.text || "") + "</mi>";
    }

    if (node.type === "mn") {
      return "<mn>" + escapeXml(node.text || "") + "</mn>";
    }

    if (node.type === "mo") {
      return "<mo>" + escapeXml(node.text || "") + "</mo>";
    }

    if (node.type === "mtext") {
      return "<mtext>" + escapeXml(node.text || "") + "</mtext>";
    }

    if (node.type === "mspace") {
      return '<mspace width="' + escapeXml(node.width || "0.1667em") + '"></mspace>';
    }

    if (node.type === "mtable") {
      return buildMathMLTable(node);
    }

    if (node.type === "mfrac") {
      return (
        "<mfrac>" +
        serializeMathNode(node.numerator) +
        serializeMathNode(node.denominator) +
        "</mfrac>"
      );
    }

    if (node.type === "mbinom") {
      return (
        '<mfenced open="(" close=")">' +
        "<mfrac linethickness=\"0\">" +
        serializeMathNode(node.numerator) +
        serializeMathNode(node.denominator) +
        "</mfrac>" +
        "</mfenced>"
      );
    }

    if (node.type === "moverset") {
      return "<mover>" + serializeMathNode(node.base) + serializeMathNode(node.over) + "</mover>";
    }

    if (node.type === "munderset") {
      return "<munder>" + serializeMathNode(node.base) + serializeMathNode(node.under) + "</munder>";
    }

    if (node.type === "msqrt") {
      return "<msqrt>" + serializeMathNode(node.body) + "</msqrt>";
    }

    if (node.type === "maccent") {
      return (
        '<mover accent="true">' +
        serializeMathNode(node.body) +
        "<mo>" +
        escapeXml(node.mathmlAccent || "") +
        "</mo>" +
        "</mover>"
      );
    }

    if (node.type === "mbar") {
      return (
        '<mover accent="true">' +
        serializeMathNode(node.body) +
        "<mo>&#x203E;</mo>" +
        "</mover>"
      );
    }

    if (node.type === "munderline") {
      return (
        '<munder accentunder="true">' +
        serializeMathNode(node.body) +
        "<mo>&#x332;</mo>" +
        "</munder>"
      );
    }

    if (node.type === "mgroupchr") {
      const wrapper =
        node.position === "bottom"
          ? { open: '<munder accentunder="true">', close: "</munder>" }
          : { open: '<mover accent="true">', close: "</mover>" };

      return (
        wrapper.open +
        serializeMathNode(node.body) +
        "<mo>" +
        escapeXml(node.mathmlChar || "") +
        "</mo>" +
        wrapper.close
      );
    }

    if (node.type === "msub") {
      return (
        "<msub>" +
        serializeMathNode(node.base) +
        serializeMathNode(node.sub) +
        "</msub>"
      );
    }

    if (node.type === "msup") {
      return (
        "<msup>" +
        serializeMathNode(node.base) +
        serializeMathNode(node.sup) +
        "</msup>"
      );
    }

    if (node.type === "msubsup") {
      return (
        "<msubsup>" +
        serializeMathNode(node.base) +
        serializeMathNode(node.sub) +
        serializeMathNode(node.sup) +
        "</msubsup>"
      );
    }

    return "<mtext>" + escapeXml(String(node.text || "")) + "</mtext>";
  }

  function serializeReadableMath(node) {
    if (!node) {
      return "";
    }

    if (node.type === "mrow") {
      return (node.children || []).map(serializeReadableMath).join("");
    }

    if (node.type === "mi" || node.type === "mn" || node.type === "mo" || node.type === "mtext") {
      return String(node.text || "");
    }

    if (node.type === "mspace") {
      return String(node.text || " ");
    }

    if (node.type === "mtable") {
      const rows = (node.rows || []).map(function (row) {
        return (row || []).map(serializeReadableMath).join(", ");
      });
      const body = rows.join("; ");
      return (node.leftDelimiter || "") + body + (node.rightDelimiter || "");
    }

    if (node.type === "mfrac") {
      return "(" + serializeReadableMath(node.numerator) + ")/(" + serializeReadableMath(node.denominator) + ")";
    }

    if (node.type === "mbinom") {
      return "binom(" + serializeReadableMath(node.numerator) + "," + serializeReadableMath(node.denominator) + ")";
    }

    if (node.type === "moverset") {
      return serializeReadableMath(node.base) + "^" + wrapReadableScript(node.over);
    }

    if (node.type === "munderset") {
      return serializeReadableMath(node.base) + "_" + wrapReadableScript(node.under);
    }

    if (node.type === "msqrt") {
      return "sqrt(" + serializeReadableMath(node.body) + ")";
    }

    if (node.type === "maccent") {
      return (node.readableName || "accent") + "(" + serializeReadableMath(node.body) + ")";
    }

    if (node.type === "mbar") {
      return "overline(" + serializeReadableMath(node.body) + ")";
    }

    if (node.type === "munderline") {
      return "underline(" + serializeReadableMath(node.body) + ")";
    }

    if (node.type === "mgroupchr") {
      return (node.readableName || "groupchr") + "(" + serializeReadableMath(node.body) + ")";
    }

    if (node.type === "msub") {
      return serializeReadableMath(node.base) + "_" + wrapReadableScript(node.sub);
    }

    if (node.type === "msup") {
      return serializeReadableMath(node.base) + "^" + wrapReadableScript(node.sup);
    }

    if (node.type === "msubsup") {
      return (
        serializeReadableMath(node.base) +
        "_" +
        wrapReadableScript(node.sub) +
        "^" +
        wrapReadableScript(node.sup)
      );
    }

    return String(node.text || "");
  }

  function wrapReadableScript(node) {
    const text = serializeReadableMath(node);
    if (/^[A-Za-z0-9\u03b1-\u03c9\u0391-\u03a9]+$/u.test(text)) {
      return text;
    }
    return "(" + text + ")";
  }

  function serializeOMMLArg(node) {
    if (!node) {
      return '<m:r><m:t xml:space="preserve"></m:t></m:r>';
    }

    if (node.type === "mrow") {
      const children = node.children || [];
      if (children.length === 0) {
        return '<m:r><m:t xml:space="preserve"></m:t></m:r>';
      }
      return children.map(serializeOMMLNode).join("");
    }

    return serializeOMMLNode(node);
  }

  function serializeOMMLNode(node) {
    if (!node) {
      return '<m:r><m:t xml:space="preserve"></m:t></m:r>';
    }

    if (node.type === "mi" || node.type === "mn" || node.type === "mo" || node.type === "mtext") {
      return buildOMMLRun(node.text || "");
    }

    if (node.type === "mspace") {
      return buildOMMLRun(node.text || " ");
    }

    if (node.type === "mtable") {
      return buildOMMLTable(node);
    }

    if (node.type === "mfrac") {
      return (
        "<m:f>" +
        "<m:num>" +
        serializeOMMLArg(node.numerator) +
        "</m:num>" +
        "<m:den>" +
        serializeOMMLArg(node.denominator) +
        "</m:den>" +
        "</m:f>"
      );
    }

    if (node.type === "mbinom") {
      return (
        "<m:d>" +
        "<m:dPr><m:begChr m:val=\"(\"/><m:endChr m:val=\")\"/></m:dPr>" +
        "<m:e>" +
        "<m:f>" +
        "<m:fPr><m:type m:val=\"noBar\"/></m:fPr>" +
        "<m:num>" +
        serializeOMMLArg(node.numerator) +
        "</m:num>" +
        "<m:den>" +
        serializeOMMLArg(node.denominator) +
        "</m:den>" +
        "</m:f>" +
        "</m:e>" +
        "</m:d>"
      );
    }

    if (node.type === "moverset") {
      return (
        "<m:limUpp>" +
        "<m:e>" +
        serializeOMMLArg(node.base) +
        "</m:e>" +
        "<m:lim>" +
        serializeOMMLArg(node.over) +
        "</m:lim>" +
        "</m:limUpp>"
      );
    }

    if (node.type === "munderset") {
      return (
        "<m:limLow>" +
        "<m:e>" +
        serializeOMMLArg(node.base) +
        "</m:e>" +
        "<m:lim>" +
        serializeOMMLArg(node.under) +
        "</m:lim>" +
        "</m:limLow>"
      );
    }

    if (node.type === "msqrt") {
      return (
        "<m:rad>" +
        "<m:deg><m:r><m:t xml:space=\"preserve\"></m:t></m:r></m:deg>" +
        "<m:e>" +
        serializeOMMLArg(node.body) +
        "</m:e>" +
        "</m:rad>"
      );
    }

    if (node.type === "maccent") {
      return (
        "<m:acc>" +
        "<m:accPr><m:chr m:val=\"" +
        escapeXml(node.ommlAccent || "") +
        "\"/></m:accPr>" +
        "<m:e>" +
        serializeOMMLArg(node.body) +
        "</m:e>" +
        "</m:acc>"
      );
    }

    if (node.type === "mbar") {
      return (
        "<m:bar>" +
        "<m:barPr><m:pos m:val=\"top\"/></m:barPr>" +
        "<m:e>" +
        serializeOMMLArg(node.body) +
        "</m:e>" +
        "</m:bar>"
      );
    }

    if (node.type === "munderline") {
      return (
        "<m:bar>" +
        "<m:barPr><m:pos m:val=\"bot\"/></m:barPr>" +
        "<m:e>" +
        serializeOMMLArg(node.body) +
        "</m:e>" +
        "</m:bar>"
      );
    }

    if (node.type === "mgroupchr") {
      return (
        "<m:groupChr>" +
        "<m:groupChrPr>" +
        "<m:chr m:val=\"" +
        escapeXml(node.ommlChar || "") +
        "\"/>" +
        "<m:pos m:val=\"" +
        escapeXml(node.position === "bottom" ? "bot" : "top") +
        "\"/>" +
        "</m:groupChrPr>" +
        "<m:e>" +
        serializeOMMLArg(node.body) +
        "</m:e>" +
        "</m:groupChr>"
      );
    }

    if (node.type === "msub") {
      return (
        "<m:sSub>" +
        "<m:e>" +
        serializeOMMLArg(node.base) +
        "</m:e>" +
        "<m:sub>" +
        serializeOMMLArg(node.sub) +
        "</m:sub>" +
        "</m:sSub>"
      );
    }

    if (node.type === "msup") {
      return (
        "<m:sSup>" +
        "<m:e>" +
        serializeOMMLArg(node.base) +
        "</m:e>" +
        "<m:sup>" +
        serializeOMMLArg(node.sup) +
        "</m:sup>" +
        "</m:sSup>"
      );
    }

    if (node.type === "msubsup") {
      return (
        "<m:sSubSup>" +
        "<m:e>" +
        serializeOMMLArg(node.base) +
        "</m:e>" +
        "<m:sub>" +
        serializeOMMLArg(node.sub) +
        "</m:sub>" +
        "<m:sup>" +
        serializeOMMLArg(node.sup) +
        "</m:sup>" +
        "</m:sSubSup>"
      );
    }

    if (node.type === "mrow") {
      return serializeOMMLArg(node);
    }

    return buildOMMLRun(String(node.text || ""));
  }

  function buildOMMLRun(text) {
    return "<m:r><m:t xml:space=\"preserve\">" + escapeXml(text) + "</m:t></m:r>";
  }

  function emptyNode() {
    return { type: "mrow", children: [] };
  }

  function escapeXml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  async function copyToClipboard(plainText, htmlText) {
    if (htmlText) {
      const copiedWithEvent = copyByExecCommand(plainText, htmlText);
      if (copiedWithEvent) {
        return { ok: true, mode: "html/execCommand" };
      }
    }

    if (
      navigator.clipboard &&
      window.isSecureContext &&
      typeof ClipboardItem !== "undefined" &&
      typeof navigator.clipboard.write === "function"
    ) {
      try {
        const payload = {
          "text/plain": new Blob([plainText], { type: "text/plain" })
        };

        if (htmlText) {
          payload["text/html"] = new Blob([htmlText], { type: "text/html" });
        }

        await navigator.clipboard.write([new ClipboardItem(payload)]);
        return { ok: true, mode: htmlText ? "html/clipboardItem" : "plain/clipboardItem" };
      } catch (error) {
        // Fallback to text-only copy.
      }
    }

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(plainText);
        return { ok: true, mode: "plain/writeText" };
      } catch (error) {
        // Fallback below.
      }
    }

    const textarea = document.createElement("textarea");
    textarea.value = plainText;
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

    return { ok: copied, mode: copied ? "plain/execCommand" : "" };
  }

  function copyByExecCommand(plainText, htmlText) {
    let wrote = false;
    const handler = function (event) {
      if (!event.clipboardData) {
        return;
      }

      event.preventDefault();
      event.clipboardData.setData("text/plain", plainText);
      if (htmlText) {
        event.clipboardData.setData("text/html", htmlText);
      }
      wrote = true;
    };

    const selection = window.getSelection();
    const savedRanges = [];
    if (selection && selection.rangeCount > 0) {
      for (let i = 0; i < selection.rangeCount; i += 1) {
        savedRanges.push(selection.getRangeAt(i).cloneRange());
      }
    }

    const helper = document.createElement("div");
    helper.setAttribute("contenteditable", "true");
    helper.style.position = "fixed";
    helper.style.left = "-9999px";
    helper.style.top = "0";
    helper.style.opacity = "0";
    helper.style.pointerEvents = "none";
    helper.textContent = "copy";
    document.documentElement.appendChild(helper);

    document.addEventListener("copy", handler, true);
    try {
      if (selection) {
        selection.removeAllRanges();
        const range = document.createRange();
        range.selectNodeContents(helper);
        selection.addRange(range);
      }
      document.execCommand("copy");
    } catch (error) {
      wrote = false;
    } finally {
      document.removeEventListener("copy", handler, true);
      helper.remove();
      if (selection) {
        selection.removeAllRanges();
        savedRanges.forEach((range) => selection.addRange(range));
      }
    }
    return wrote;
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
    fab.style.left = String(left) + "px";
    fab.style.top = String(top) + "px";
    if (persist) {
      savePosition(left, top);
    }
  }

  function savePosition(left, top) {
    try {
      localStorage.setItem(POSITION_KEY, JSON.stringify({ left, top }));
    } catch (error) {
      // Ignore storage errors on restricted pages.
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
