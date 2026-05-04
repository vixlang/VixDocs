import * as path from 'path';
import { ExtensionContext, window, workspace } from 'vscode';
import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
    TransportKind
} from 'vscode-languageclient/node';

let client: LanguageClient;

export async function activate(context: ExtensionContext) {
    // 定义服务器模块路径
    const serverModule = context.asAbsolutePath(path.join('out', 'language-server', 'server.js'));
    
    // 调试选项
    const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };
    
    // 服务器选项
    const serverOptions: ServerOptions = {
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
    const clientOptions: LanguageClientOptions = {
        documentSelector: [{ 
            scheme: 'file', 
            language: 'vix' 
        }],
        synchronize: {
            // 监视配置文件的变化
            fileEvents: workspace.createFileSystemWatcher('**/.vix')
        }
    };
    
    // 创建语言客户端
    client = new LanguageClient(
        'vixLanguageServer',
        'Vix Language Server',
        serverOptions,
        clientOptions
    );
    
    // 启动客户端
    await client.start();
    
    window.showInformationMessage('Vix Language Server is now active!');
}

export function deactivate(): Thenable<void> | undefined {
    if (!client) {
        return undefined;
    }
    return client.stop();
}