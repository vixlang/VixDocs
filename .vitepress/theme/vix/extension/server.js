const {
    createConnection,
    TextDocuments,
    TextDocumentSyncKind,
    ProposedFeatures,
    CompletionItem,
    CompletionItemKind,
    Diagnostic,
    DiagnosticSeverity
} = require('vscode-languageserver/node');

// 创建连接
const connection = createConnection(ProposedFeatures.all);

// 创建文档管理器
const documents = new TextDocuments(TextDocumentSyncKind.Incremental);

let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;
let hasDiagnosticRelatedInformationCapability = false;

connection.onInitialize((params) => {
    const capabilities = params.capabilities;

    // 检查客户端是否支持配置功能
    hasConfigurationCapability = !!(
        capabilities.workspace && !!capabilities.workspace.configuration
    );
    // 检查客户端是否支持工作区文件夹功能
    hasWorkspaceFolderCapability = !!(
        capabilities.workspace && !!capabilities.workspace.workspaceFolders
    );
    // 检查客户端是否支持相关诊断信息
    hasDiagnosticRelatedInformationCapability = !!(
        capabilities.textDocument &&
        capabilities.textDocument.publishDiagnostics &&
        capabilities.textDocument.publishDiagnostics.relatedInformation
    );

    return {
        capabilities: {
            textDocumentSync: TextDocumentSyncKind.Incremental,
            completionProvider: {
                resolveProvider: true,
                triggerCharacters: ['.']
            },
            diagnosticProvider: {
                documentSelector: [{ scheme: 'file', language: 'your-lang' }],
                interFileDependencies: false,
                workspaceDiagnostics: false
            }
        }
    };
});

connection.onInitialized(() => {
    if (hasConfigurationCapability) {
        connection.client.register({
            method: 'workspace/didChangeConfiguration',
            registerOptions: {}
        });
    }
    if (hasWorkspaceFolderCapability) {
        connection.workspace.onDidChangeWorkspaceFolders((_event) => {
            connection.console.log('Workspace folder change event received.');
        });
    }
});

// 存储文档设置
const documentSettings = new Map();

// 重置所有文档设置
connection.onDidChangeConfiguration((change) => {
    if (hasConfigurationCapability) {
        documentSettings.clear();
    } else {
        documentSettings.set('*', change.settings);
    }

    // 重新验证所有打开的文档
    documents.all().forEach(validateTextDocument);
});

// 仅当客户端不支持文档设置时才使用全局设置
function getDocumentSettings(resource) {
    if (!hasConfigurationCapability) {
        return Promise.resolve(documentSettings.get('*'));
    }
    let result = documentSettings.get(resource);
    if (!result) {
        result = connection.workspace.getConfiguration({
            scopeUri: resource,
            section: 'your-lang'
        });
        documentSettings.set(resource, result);
    }
    return result;
}

// 监听文档变化并验证
documents.onDidOpen(change => {
    validateTextDocument(change.document);
});

documents.onDidChangeContent(change => {
    validateTextDocument(change.document);
});

async function validateTextDocument(textDocument) {
    const diagnostics = [];

    // 获取文档内容
    const text = textDocument.getText();
    const lines = text.split(/\r?\n/g);

    // 遍历每一行检查错误
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // 检查一些常见的错误模式
        if (line.includes('error')) {
            diagnostics.push(
                Diagnostic.create(
                    { start: { line: i, character: line.indexOf('error') }, 
                      end: { line: i, character: line.indexOf('error') + 5 } },
                    'Found error keyword in line',
                    DiagnosticSeverity.Error,
                    100,
                    'YourLangChecker'
                )
            );
        }
        
        // 检查语法错误：未闭合的括号
        const openParen = (line.match(/\(/g) || []).length;
        const closeParen = (line.match(/\)/g) || []).length;
        if (openParen > closeParen) {
            diagnostics.push(
                Diagnostic.create(
                    { start: { line: i, character: 0 }, 
                      end: { line: i, character: line.length } },
                    'Unmatched parentheses',
                    DiagnosticSeverity.Warning,
                    101,
                    'YourLangChecker'
                )
            );
        }
    }

    // 发送诊断信息到客户端
    connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}

// 提供代码补全建议
connection.onCompletion(async (textDocumentPosition) => {
    // 获取当前文档的设置
    const document = documents.get(textDocumentPosition.textDocument.uri);
    if (!document) {
        return [];
    }

    const completions = [];

    // 基础关键词补全
    const keywords = [
        { label: 'function', detail: 'Define a function', insertText: 'function $1($2) {\n\t$0\n}' },
        { label: 'if', detail: 'If statement', insertText: 'if ($1) {\n\t$0\n}' },
        { label: 'ifelse', detail: 'If-Else statement', insertText: 'if ($1) {\n\t$2\n} else {\n\t$0\n}' },
        { label: 'for', detail: 'For loop', insertText: 'for (let i = 0; i < $1; i++) {\n\t$0\n}' },
        { label: 'while', detail: 'While loop', insertText: 'while ($1) {\n\t$0\n}' },
        { label: 'variable', detail: 'Variable declaration', insertText: 'let $1 = $0;' },
        { label: 'console.log', detail: 'Log to console', insertText: 'console.log($0);' }
    ];

    keywords.forEach(keyword => {
        completions.push({
            label: keyword.label,
            kind: CompletionItemKind.Keyword,
            detail: keyword.detail,
            insertText: keyword.insertText,
            insertTextFormat: 2 // Snippet format
        });
    });

    // 特定库函数补全
    const libraryFunctions = [
        { label: 'myLib.getData', detail: 'Get data from myLib', insertText: 'myLib.getData($0)' },
        { label: 'myLib.process', detail: 'Process data with myLib', insertText: 'myLib.process($0)' },
        { label: 'myLib.render', detail: 'Render with myLib', insertText: 'myLib.render($0)' }
    ];

    libraryFunctions.forEach(func => {
        completions.push({
            label: func.label,
            kind: CompletionItemKind.Method,
            detail: func.detail,
            insertText: func.insertText,
            insertTextFormat: 2
        });
    });

    return completions;
});

// 解析补全项
connection.onCompletionResolve((item) => {
    if (item.data === 1) {
        item.detail = 'TypeScript details';
        item.documentation = 'TypeScript documentation';
    } else if (item.data === 2) {
        item.detail = 'JavaScript details';
        item.documentation = 'JavaScript documentation';
    }
    return item;
});

// 监听文档改变
documents.listen(connection);

// 监听连接
connection.listen();