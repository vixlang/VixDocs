const {
    LanguageClient,
    TransportKind
} = require('vscode-languageclient/node');

let client;

function activate(context) {
    // 定义服务器模块路径
    const serverModule = context.asAbsolutePath('./server.js');
    
    // 调试选项
    const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };
    
    // 服务器选项
    const serverOptions = {
        run: { 
            module: serverModule, 
            transport: TransportKind.ipc 
        },
        debug: { 
            module: serverModule, 
            transport: TransportKind.ipc, 
            options: debugOptions 
        }
    };
    
    // 客户端选项
    const clientOptions = {
        documentSelector: [{ 
            scheme: 'file', 
            language: 'your-lang' 
        }],
        synchronize: {
            // 监视配置文件的变化
            fileEvents: require('vscode').workspace.createFileSystemWatcher('**/.your-lang')
        }
    };
    
    // 创建语言客户端
    client = new LanguageClient(
        'yourLangServer',
        'Your Lang Server',
        serverOptions,
        clientOptions
    );
    
    // 启动客户端
    client.start();
    
    console.log('Your Lang extension is now active!');
}

function deactivate() {
    if (!client) {
        return undefined;
    }
    return client.stop();
}

exports.activate = activate;
exports.deactivate = deactivate;