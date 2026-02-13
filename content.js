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
    infty: "\u221e",
    partial: "\u2202",
    nabla: "\u2207",
    sum: "\u2211",
    prod: "\u220f",
    int: "\u222b"
  };

  const LATEX_CMD_TO_OPERATOR = {
    cdot: "\u22c5",
    times: "\u00d7",
    div: "\u00f7",
    pm: "\u00b1",
    mp: "\u2213",
    le: "\u2264",
    leq: "\u2264",
    ge: "\u2265",
    geq: "\u2265",
    neq: "\u2260",
    ne: "\u2260",
    approx: "\u2248",
    in: "\u2208",
    notin: "\u2209",
    subset: "\u2282",
    subseteq: "\u2286",
    supset: "\u2283",
    supseteq: "\u2287",
    cup: "\u222a",
    cap: "\u2229",
    to: "\u2192",
    leftarrow: "\u2190",
    rightarrow: "\u2192",
    leftrightarrow: "\u2194",
    Rightarrow: "\u21d2",
    Leftarrow: "\u21d0",
    Leftrightarrow: "\u21d4",
    lbrace: "{",
    rbrace: "}",
    langle: "\u27e8",
    rangle: "\u27e9",
    vert: "|",
    Vert: "\u2016"
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

      const base = parseBase();
      return base ? parseScripts(base) : null;
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

      if (name === "overline" || name === "bar") {
        const body = parseRequiredArg();
        return { type: "mbar", body: body || emptyNode() };
      }

      if (name === "text" || name === "mathrm" || name === "operatorname") {
        const raw = parseRawGroupText();
        return { type: "mtext", text: raw };
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

      if (name === "," || name === ";" || name === ":" || name === "!") {
        return { type: "mtext", text: " " };
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
          text += next();
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

    if (node.type === "mfrac") {
      return (
        "<mfrac>" +
        serializeMathNode(node.numerator) +
        serializeMathNode(node.denominator) +
        "</mfrac>"
      );
    }

    if (node.type === "msqrt") {
      return "<msqrt>" + serializeMathNode(node.body) + "</msqrt>";
    }

    if (node.type === "mbar") {
      return (
        '<mover accent="true">' +
        serializeMathNode(node.body) +
        "<mo>&#x203E;</mo>" +
        "</mover>"
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

    if (node.type === "mfrac") {
      return "(" + serializeReadableMath(node.numerator) + ")/(" + serializeReadableMath(node.denominator) + ")";
    }

    if (node.type === "msqrt") {
      return "sqrt(" + serializeReadableMath(node.body) + ")";
    }

    if (node.type === "mbar") {
      return "overline(" + serializeReadableMath(node.body) + ")";
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

