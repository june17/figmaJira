// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__);
figma.ui.onmessage = (msg) => __awaiter(this, void 0, void 0, function* () {
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.
    yield figma.loadFontAsync({ family: "Roboto", style: "Regular" });
    if (msg.type === 'create-rectangles') {
        let cov = { width: 1920, height: 960, title: msg.name };
        const nodes = [];
        const rect = figma.createRectangle();
        const text2 = figma.createText();
        text2.characters = msg.name;
        rect.resize(cov.width, cov.height);
        text2.x = 100;
        text2.y = 708;
        text2.fontSize = 120;
        figma.currentPage.name = "Cover";
        rect.fills = [{ type: 'SOLID', color: { r: 1, g: .4, b: 0 } }];
        figma.currentPage.appendChild(rect);
        figma.currentPage.appendChild(text2);
        nodes.push(rect);
        figma.currentPage.selection = nodes;
        figma.viewport.scrollAndZoomIntoView(nodes);
    }
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    figma.closePlugin();
});
