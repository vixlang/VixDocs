"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("vscode-languageserver/node");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
// 创建连接，用于与语言客户端通信
const connection = (0, node_1.createConnection)(node_1.ProposedFeatures.all);
// 文档集合，管理所有打开的文档
const documents = new node_1.TextDocuments(vscode_languageserver_textdocument_1.TextDocument);
let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;
let hasDiagnosticRelatedInformationCapability = false;
connection.onInitialize((params) => {
    const capabilities = params.capabilities;
    // 检查客户端功能
    hasConfigurationCapability = !!(capabilities.workspace && !!capabilities.workspace.configuration);
    hasWorkspaceFolderCapability = !!(capabilities.workspace && !!capabilities.workspace.workspaceFolders);
    hasDiagnosticRelatedInformationCapability = !!(capabilities.textDocument &&
        capabilities.textDocument.publishDiagnostics &&
        capabilities.textDocument.publishDiagnostics.relatedInformation);
    const result = {
        capabilities: {
            textDocumentSync: node_1.TextDocumentSyncKind.Incremental,
            completionProvider: {
                triggerCharacters: ['.', ':']
            },
            // 添加诊断提供者以支持实时错误检测
            diagnosticProvider: {
                documentSelector: [{ scheme: 'file', language: 'vix' }],
                interFileDependencies: false,
                workspaceDiagnostics: false
            },
            // 添加 hover 功能
            hoverProvider: true
        }
    };
    return result;
});
connection.onInitialized(() => {
    if (hasConfigurationCapability) {
        connection.client.register(node_1.DidChangeConfigurationNotification.type, undefined);
    }
    if (hasWorkspaceFolderCapability) {
        connection.workspace.onDidChangeWorkspaceFolders(_event => {
            connection.console.log('Workspace folder change event received.');
        });
    }
});
// 监听文档内容变化，执行诊断
documents.onDidChangeContent(change => {
    validateTextDocument(change.document);
});
// 添加Hover处理器
connection.onHover((params) => {
    const document = documents.get(params.textDocument.uri);
    if (!document) {
        return null;
    }
    const position = params.position;
    const text = document.getText();
    const lines = text.split('\n');
    // 获取光标所在行的内容
    const line = lines[position.line];
    if (!line) {
        return null;
    }
    // 查找光标位置的单词
    let start = position.character;
    let end = position.character;
    // 向左查找单词边界
    while (start > 0 && /[\w:&<>]/.test(line.charAt(start - 1))) {
        start--;
    }
    // 向右查找单词边界
    while (end < line.length && /[\w:&<>]/.test(line.charAt(end))) {
        end++;
    }
    const word = line.substring(start, end);
    // 这里可以根据具体的Vix语言函数定义来返回相应信息
    // 为了演示，这里提供了一些示例函数的文档
    const functionDocs = {
        'if': '条件语句: ```vix\nif (condition) { ... }\n```',
        'while': '循环语句: ```vix\nwhile (condition) { ... }\n```',
        'for': '循环语句: ```vix\nfor (init; condition; increment) { ... }\n```',
        'print': '输出函数: ```vix\nprint(value) - 输出指定值到控制台\n```',
        'input': '#输入函数: ```vix\ninput() - 从控制台读取用户输入\n```',
    };
    if (functionDocs[word]) {
        return {
            contents: {
                kind: 'markdown',
                value: functionDocs[word]
            },
            range: {
                start: { line: position.line, character: start },
                end: { line: position.line, character: end }
            }
        };
    }
    // 使用更精确的正则表达式查找自定义函数定义
    // 支持 fn 函数名(...) -> 返回类型 格式
    const funcRegex = new RegExp(`\\bfn\\s+${word}\\s*\\([^)]*\\)(?:\\s*->\\s*\\w+)?`, 'g');
    let match;
    while ((match = funcRegex.exec(text)) !== null) {
        // 获取匹配的函数定义
        const fullFunctionDef = match[0].trim();
        // 为了更美观的显示，我们可以添加一些格式化
        return {
            contents: {
                kind: 'markdown',
                value: '```vix\n' + fullFunctionDef + '\n```\n\n函数 ```' + word + '``` 定义于第 ' + (position.line + 1) + ' 行'
            },
            range: {
                start: { line: position.line, character: start },
                end: { line: position.line, character: end }
            }
        };
    }
    // 检查是否是内置类型
    const builtinTypes = ['i8', 'i32', 'i64', 'u8', 'u16', 'u32', 'u64', 'f32', 'f64', 'string', 'bool', 'void'];
    if (builtinTypes.includes(word)) {
        return {
            contents: {
                kind: 'markdown',
                value: `内置类型: \`${word}\``
            },
            range: {
                start: { line: position.line, character: start },
                end: { line: position.line, character: end }
            }
        };
    }
    return null;
});
// 实现文档诊断请求处理器
connection.onRequest(node_1.DocumentDiagnosticRequest.type, (params) => {
    const document = documents.get(params.textDocument.uri);
    if (!document) {
        return {
            kind: 'full',
            items: []
        };
    }
    const diagnostics = validateTextDocumentForDiagnostic(document);
    return {
        kind: 'full',
        items: diagnostics
    };
});
// 验证文档内容并发送诊断信息
function validateTextDocument(textDocument) {
    const diagnostics = validateTextDocumentForDiagnostic(textDocument);
    // 发布诊断信息到客户端
    connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}
// 验证文档内容并返回诊断信息
// 添加对extern块的支持和改进字符串解析
function validateTextDocumentForDiagnostic(textDocument) {
    const diagnostics = [];
    const text = textDocument.getText();
    const lines = text.split('\n');
    // 检测extern块以避免在其中进行某些检查
    let insideExternBlock = false;
    let externBlockStartLine = -1;
    // 全局语法检查 - 括号匹配
    const fullText = text.replace(/\/\*[\s\S]*?\*\//g, '') // 移除多行注释
        .replace(/\/\/.*/g, ''); // 移除单行注释
    // 使用栈来跟踪括号匹配
    const braceStack = [];
    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
        const line = lines[lineIdx];
        // 检测extern块的开始和结束
        if (/\bextern\s+"[^"]*"\s*\{/.test(line)) {
            insideExternBlock = true;
            externBlockStartLine = lineIdx;
        }
        else if (insideExternBlock && line.includes('{')) {
            // 增加左括号计数
            const braceMatches = (line.match(/[{}]/g) || []);
            for (const char of braceMatches) {
                if (char === '{') {
                    braceStack.push({ char, line: lineIdx, col: line.indexOf(char), fullLine: line });
                }
                else if (char === '}') {
                    if (braceStack.length > 0 && braceStack[braceStack.length - 1].char === '{') {
                        braceStack.pop();
                    }
                    else {
                        // 额外的右括号
                        braceStack.push({ char, line: lineIdx, col: line.indexOf(char), fullLine: line });
                    }
                }
            }
            // 如果栈为空，表示extern块结束了
            if (braceStack.length === 0) {
                insideExternBlock = false;
            }
        }
        else {
            for (let colIdx = 0; colIdx < line.length; colIdx++) {
                const char = line[colIdx];
                if (/[{}[\]()]/.test(char)) {
                    switch (char) {
                        case '(':
                        case '[':
                        case '{':
                            braceStack.push({ char, line: lineIdx, col: colIdx, fullLine: line });
                            break;
                        case ')':
                            if (braceStack.length === 0 || braceStack.pop()?.char !== '(') {
                                const diagnostic = {
                                    severity: node_1.DiagnosticSeverity.Error,
                                    range: {
                                        start: { line: lineIdx, character: colIdx },
                                        end: { line: lineIdx, character: colIdx + 1 }
                                    },
                                    message: `多余的右小括号在第 ${lineIdx + 1} 行`,
                                    source: 'vix'
                                };
                                diagnostics.push(diagnostic);
                            }
                            break;
                        case ']':
                            if (braceStack.length === 0 || braceStack.pop()?.char !== '[') {
                                const diagnostic = {
                                    severity: node_1.DiagnosticSeverity.Error,
                                    range: {
                                        start: { line: lineIdx, character: colIdx },
                                        end: { line: lineIdx, character: colIdx + 1 }
                                    },
                                    message: `多余的右方括号在第 ${lineIdx + 1} 行`,
                                    source: 'vix'
                                };
                                diagnostics.push(diagnostic);
                            }
                            break;
                        case '}':
                            if (braceStack.length === 0 || braceStack.pop()?.char !== '{') {
                                const diagnostic = {
                                    severity: node_1.DiagnosticSeverity.Error,
                                    range: {
                                        start: { line: lineIdx, character: colIdx },
                                        end: { line: lineIdx, character: colIdx + 1 }
                                    },
                                    message: `多余的右花括号在第 ${lineIdx + 1} 行`,
                                    source: 'vix'
                                };
                                diagnostics.push(diagnostic);
                            }
                            break;
                    }
                }
            }
        }
    }
    // 检查未闭合的括号，对函数定义特殊处理
    while (braceStack.length > 0) {
        const unmatched = braceStack.pop();
        // 特殊处理：如果是函数定义中的左圆括号，可能只是没有函数体
        if (unmatched.char === '(' && unmatched.fullLine && /\bfn\s+\w+\s*\([^)]*$/.test(unmatched.fullLine.trim())) {
            // 这是一个函数定义，可能只是没有函数体，不报错
            continue;
        }
        const diagnostic = {
            severity: node_1.DiagnosticSeverity.Error,
            range: {
                start: { line: unmatched.line, character: unmatched.col },
                end: { line: unmatched.line, character: unmatched.col + 1 }
            },
            message: `未闭合的 ${unmatched.char} 在第 ${unmatched.line + 1} 行`,
            source: 'vix'
        };
        diagnostics.push(diagnostic);
    }
    // 逐行检查
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        // 检查未闭合的字符串
        const doubleQuoteCount = (line.match(/"/g) || []).length;
        const singleQuoteCount = (line.match(/'/g) || []).length;
        // 检查是否有字符串跨越多行的情况
        if (doubleQuoteCount % 2 === 1) {
            // 检查是否在extern块内，extern块内的函数声明不需要严格检查字符串内容
            if (!isInExternBlock(i, lines)) {
                const diagnostic = {
                    severity: node_1.DiagnosticSeverity.Error,
                    range: {
                        start: { line: i, character: 0 },
                        end: { line: i, character: line.length }
                    },
                    message: `未闭合的字符串在第 ${i + 1} 行`,
                    source: 'vix'
                };
                if (hasDiagnosticRelatedInformationCapability) {
                    diagnostic.relatedInformation = [
                        {
                            location: {
                                uri: textDocument.uri,
                                range: {
                                    start: { line: i, character: 0 },
                                    end: { line: i, character: line.length }
                                }
                            },
                            message: '请检查字符串引号是否配对'
                        }
                    ];
                }
                diagnostics.push(diagnostic);
            }
        }
        if (singleQuoteCount % 2 === 1) {
            if (!isInExternBlock(i, lines)) {
                const diagnostic = {
                    severity: node_1.DiagnosticSeverity.Error,
                    range: {
                        start: { line: i, character: 0 },
                        end: { line: i, character: line.length }
                    },
                    message: `未闭合的字符在第 ${i + 1} 行`,
                    source: 'vix'
                };
                if (hasDiagnosticRelatedInformationCapability) {
                    diagnostic.relatedInformation = [
                        {
                            location: {
                                uri: textDocument.uri,
                                range: {
                                    start: { line: i, character: 0 },
                                    end: { line: i, character: line.length }
                                }
                            },
                            message: '请检查字符引号是否配对'
                        }
                    ];
                }
                diagnostics.push(diagnostic);
            }
        }
        // 更精确地检查语法错误：以数字开头的标识符（排除纯数字）
        // 使用正则表达式匹配以数字开头的标识符，但排除独立的数字
        const tokens = line.split(/(\s+|[(),=+\-*\/{}\[\];])/);
        for (const token of tokens) {
            // 检查是否是标识符（以数字开头的字母数字组合，长度大于1，且包含至少一个非数字字符）
            if (token && /^\d\w+$/.test(token) && /[a-zA-Z_]/.test(token)) {
                // 找到token在行中的位置
                const startPos = line.indexOf(token);
                const diagnostic = {
                    severity: node_1.DiagnosticSeverity.Error,
                    range: {
                        start: { line: i, character: startPos },
                        end: { line: i, character: startPos + token.length }
                    },
                    message: `标识符不能以数字开头: "${token}"`,
                    source: 'vix'
                };
                diagnostics.push(diagnostic);
            }
        }
        // 检查重复的变量声明
        const varDeclarationPattern = /\b(var|let|const|mut)\s+(\w+)/g;
        let varMatch;
        while ((varMatch = varDeclarationPattern.exec(line)) !== null) {
            const varName = varMatch[2];
            // 简单检查：在同一个文档中是否已经声明过该变量
            for (let j = 0; j < i; j++) {
                const prevLine = lines[j];
                // 检查之前的行是否包含相同的变量声明
                if (new RegExp(`\\b(var|let|const|mut)\\s+${varName}\\b`).test(prevLine)) {
                    const prevVarStart = prevLine.indexOf(varName);
                    const diagnostic = {
                        severity: node_1.DiagnosticSeverity.Warning,
                        range: {
                            start: { line: i, character: varMatch.index },
                            end: { line: i, character: varMatch.index + varMatch[0].length }
                        },
                        message: `变量 "${varName}" 已经被声明`,
                        source: 'vix'
                    };
                    diagnostics.push(diagnostic);
                    break;
                }
            }
        }
    }
    return diagnostics;
}
// 辅助函数：判断某一行是否在extern块内部
function isInExternBlock(lineIndex, lines) {
    let braceDepth = 0;
    let inExtern = false;
    for (let i = 0; i <= lineIndex; i++) {
        const line = lines[i];
        // 检查是否进入extern块
        if (/\bextern\s+"[^"]*"\s*\{/.test(line)) {
            inExtern = true;
        }
        // 计算括号深度
        for (const char of line) {
            if (char === '{') {
                braceDepth++;
            }
            else if (char === '}') {
                braceDepth--;
                // 如果深度归零，说明extern块结束
                if (braceDepth === 0 && inExtern) {
                    inExtern = false;
                }
            }
        }
    }
    return inExtern;
}
// 额外的辅助函数：提取文档中的变量和函数定义
function extractSymbolsFromDocument(document) {
    const text = document.getText();
    const lines = text.split('\n');
    const symbols = [];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        // 匹配函数定义: fn functionName(...)
        const fnMatch = line.match(/\bfn\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/);
        if (fnMatch) {
            symbols.push({
                label: fnMatch[1],
                kind: node_1.CompletionItemKind.Function,
                detail: `函数 fn ${fnMatch[1]}`
            });
        }
        // 匹配 extern 函数定义
        const externFnMatch = line.match(/extern\s+"[^"]*"\s*\{\s*fn\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/);
        if (externFnMatch) {
            symbols.push({
                label: externFnMatch[1],
                kind: node_1.CompletionItemKind.Function,
                detail: `外部函数 ${externFnMatch[1]}`
            });
        }
        // 匹配变量定义: var/let/mut identifier
        const varMatch = line.match(/\b(?:var|let|mut)\s+([a-zA-Z_][a-zA-Z0-9_]*)/);
        if (varMatch) {
            symbols.push({
                label: varMatch[1],
                kind: node_1.CompletionItemKind.Variable,
                detail: `变量 ${varMatch[1]}`
            });
        }
        // 匹配结构体定义: struct StructName
        const structMatch = line.match(/\bstruct\s+([a-zA-Z_][a-zA-Z0-9_]*)/);
        if (structMatch) {
            symbols.push({
                label: structMatch[1],
                kind: node_1.CompletionItemKind.Class,
                detail: `结构体 ${structMatch[1]}`
            });
        }
    }
    return symbols;
}
// 处理代码补全请求
connection.onCompletion((_textDocumentPosition) => {
    // 获取当前文档
    const document = documents.get(_textDocumentPosition.textDocument.uri);
    if (!document) {
        return { isIncomplete: false, items: [] };
    }
    // 当前行的内容
    const position = _textDocumentPosition.position;
    const line = document.getText({
        start: { line: position.line, character: 0 },
        end: { line: position.line, character: position.character }
    });
    // 根据上下文提供不同的补全建议
    let items = [];
    // 提取文档中的符号
    const documentSymbols = extractSymbolsFromDocument(document);
    // 如果行以空格开头，可能是在写控制结构
    if (/^\s*$/.test(line)) {
        items = [
            {
                label: 'extern',
                kind: node_1.CompletionItemKind.Keyword,
                detail: '外部链接声明'
            },
            {
                label: 'if',
                kind: node_1.CompletionItemKind.Keyword,
                detail: '条件语句'
            },
            {
                label: 'while',
                kind: node_1.CompletionItemKind.Keyword,
                detail: '循环语句'
            },
            {
                label: 'for',
                kind: node_1.CompletionItemKind.Keyword,
                detail: '循环语句'
            },
            {
                label: 'fn',
                kind: node_1.CompletionItemKind.Keyword,
                detail: '函数定义'
            },
            {
                label: 'struct',
                kind: node_1.CompletionItemKind.Keyword,
                detail: '结构体定义'
            },
            {
                label: 'mut',
                kind: node_1.CompletionItemKind.Keyword,
                detail: '可变变量声明'
            },
            {
                label: 'return',
                kind: node_1.CompletionItemKind.Keyword,
                detail: '返回语句'
            }
        ];
    }
    else if (line.endsWith('.')) {
        // 如果用户输入了点号，则提供属性/方法补全
        items = [
            {
                label: 'property1',
                kind: node_1.CompletionItemKind.Field,
                detail: '示例属性1'
            },
            {
                label: 'method1()',
                kind: node_1.CompletionItemKind.Method,
                detail: '示例方法1'
            }
        ];
    }
    else {
        // 根据当前输入的前缀过滤补全项
        const prefix = line.split(/\W+/).pop() || '';
        // 检查是否是关键字补全
        const keywords = [
            { label: 'extern', kind: node_1.CompletionItemKind.Keyword, detail: '外部链接声明' },
            { label: 'if', kind: node_1.CompletionItemKind.Keyword, detail: '条件语句' },
            { label: 'while', kind: node_1.CompletionItemKind.Keyword, detail: '循环语句' },
            { label: 'for', kind: node_1.CompletionItemKind.Keyword, detail: '循环语句' },
            { label: 'fn', kind: node_1.CompletionItemKind.Keyword, detail: '函数定义' },
            { label: 'struct', kind: node_1.CompletionItemKind.Keyword, detail: '结构体定义' },
            { label: 'mut', kind: node_1.CompletionItemKind.Keyword, detail: '可变变量声明' },
            { label: 'return', kind: node_1.CompletionItemKind.Keyword, detail: '返回语句' },
            { label: 'else', kind: node_1.CompletionItemKind.Keyword, detail: '条件分支' },
            { label: 'elif', kind: node_1.CompletionItemKind.Keyword, detail: '条件分支' },
            { label: 'true', kind: node_1.CompletionItemKind.Value, detail: '布尔值' },
            { label: 'false', kind: node_1.CompletionItemKind.Value, detail: '布尔值' },
            { label: 'obj', kind: node_1.CompletionItemKind.Keyword, detail: '对象定义' },
            { label: 'impl', kind: node_1.CompletionItemKind.Keyword, detail: '实现块' },
            { label: 'as', kind: node_1.CompletionItemKind.Keyword, detail: '类型转换' },
            { label: 'public', kind: node_1.CompletionItemKind.Keyword, detail: '公共访问修饰符' },
            { label: 'in', kind: node_1.CompletionItemKind.Keyword, detail: '循环中的成员操作符' },
            { label: 'break', kind: node_1.CompletionItemKind.Keyword, detail: '跳出循环' },
            { label: 'continue', kind: node_1.CompletionItemKind.Keyword, detail: '继续下一次循环' }
        ];
        // 类型补全
        const types = [
            { label: 'i8', kind: node_1.CompletionItemKind.TypeParameter, detail: '8位有符号整数' },
            { label: 'i16', kind: node_1.CompletionItemKind.TypeParameter, detail: '16位有符号整数' },
            { label: 'i32', kind: node_1.CompletionItemKind.TypeParameter, detail: '32位有符号整数' },
            { label: 'i64', kind: node_1.CompletionItemKind.TypeParameter, detail: '64位有符号整数' },
            { label: 'u8', kind: node_1.CompletionItemKind.TypeParameter, detail: '8位无符号整数' },
            { label: 'u16', kind: node_1.CompletionItemKind.TypeParameter, detail: '16位无符号整数' },
            { label: 'u32', kind: node_1.CompletionItemKind.TypeParameter, detail: '32位无符号整数' },
            { label: 'u64', kind: node_1.CompletionItemKind.TypeParameter, detail: '64位无符号整数' },
            { label: 'f32', kind: node_1.CompletionItemKind.TypeParameter, detail: '32位浮点数' },
            { label: 'f64', kind: node_1.CompletionItemKind.TypeParameter, detail: '64位浮点数' },
            { label: 'string', kind: node_1.CompletionItemKind.TypeParameter, detail: '字符串类型' },
            { label: 'bool', kind: node_1.CompletionItemKind.TypeParameter, detail: '布尔类型' },
            { label: 'void', kind: node_1.CompletionItemKind.TypeParameter, detail: '空类型' }
        ];
        // 预定义函数补全
        const functions = [
            {
                label: 'print',
                kind: node_1.CompletionItemKind.Function,
                detail: '输出函数',
                insertText: 'print(${1:value})',
                insertTextFormat: node_1.InsertTextFormat.Snippet
            },
            {
                label: 'input',
                kind: node_1.CompletionItemKind.Function,
                detail: '输入函数',
                insertText: 'input()',
                insertTextFormat: node_1.InsertTextFormat.Snippet
            },
            {
                label: 'strlen',
                kind: node_1.CompletionItemKind.Function,
                detail: '字符串长度函数',
                insertText: 'strlen(${1:str})',
                insertTextFormat: node_1.InsertTextFormat.Snippet
            },
            {
                label: 'substr',
                kind: node_1.CompletionItemKind.Function,
                detail: '子字符串函数',
                insertText: 'substr(${1:str}, ${2:start}, ${3:length})',
                insertTextFormat: node_1.InsertTextFormat.Snippet
            }
        ];
        // 合并所有补全项，优先显示文档中的符号
        items = [
            ...documentSymbols.filter(sym => sym.label.startsWith(prefix)),
            ...keywords.filter(kw => kw.label.startsWith(prefix)),
            ...types.filter(ty => ty.label.startsWith(prefix)),
            ...functions.filter(func => func.label.startsWith(prefix))
        ];
    }
    return { isIncomplete: false, items };
});
// 监听连接关闭事件
connection.onDidChangeWatchedFiles(_change => {
    connection.console.log('我们监视的文件已更改');
});
// 监听文档同步请求
documents.listen(connection);
// 监听连接
connection.listen();
//# sourceMappingURL=server.js.map