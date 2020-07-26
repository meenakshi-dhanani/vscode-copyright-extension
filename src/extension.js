// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "copyright" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('copyright.updateCopyright', function () {
		// The code you place here will be executed every time your command is executed

		const panel = vscode.window.createWebviewPanel(
			'copyright', // Identifies the type of the webview. Used internally
			'Copyright', // Title of the panel displayed to the user
			vscode.ViewColumn.One, // Editor column to show the new webview panel in.
			{
				enableScripts: true
			} // Webview options. More on these later.
		  );

		  panel.webview.html = getWebviewContent();

		   // Handle messages from the webview
		   panel.webview.onDidReceiveMessage(
			message => {
			  switch (message.command) {
				case 'updateCopyright':
				  vscode.window.showErrorMessage(message.text);
				  return;
			  }
			},
			undefined,
			context.subscriptions
		  );
	});

	context.subscriptions.push(disposable);
}

function getWebviewContent() {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Copyright</title>
  </head>
  <body>
	<input type="textarea" id="copyrightText"/>
	<button onClick="handleUpdate()">Update</button>
	<script>
	function handleUpdate() {
		const vscode = acquireVsCodeApi();
		const copyrightText = document.getElementById('copyrightText').value;

		vscode.postMessage({
			command: 'updateCopyright',
			text: copyrightText
		});
	}
</script>
  </body>
  </html>`;
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
