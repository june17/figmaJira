// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.

interface Cover {
  width: number;
  height: number;
  title: string;
}


figma.ui.onmessage = async(msg) => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  await figma.loadFontAsync({ family: "Roboto", style: "Regular" })
  if (msg.type === 'create-rectangles') {
    let cov: Cover = {width: 1920, height: 960,title: msg.textbox}
    const nodes: SceneNode[] = [];
    const rect = figma.createRectangle();
    const text2 = figma.createText();
    text2.characters = cov.title;
    rect.resize(cov.width, cov.height)
    text2.x = 100;
    text2.y = 708;
    text2.fontSize = 120;
    figma.currentPage.name = "Cover"
    rect.fills = [{type: 'SOLID', color: {r: 1, g: .4, b: 0}}];
    figma.currentPage.appendChild(rect);
    figma.currentPage.appendChild(text2);
    nodes.push(rect);
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};
