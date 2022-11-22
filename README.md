# Facebook Send API Helper

This program, written Vue3 is a tool that helps creating and managing Facebook Send API message and templates in JSON Format. Many Bot builder has their one, so this project has the goal to create a simple tool that any one can use and tweak as they want.

This tool can help to test how the generated JSON Messages are displayed on Messenger directly by sending it with an Facebook Page Access Token and an PSID.

The JSON editor used here is from [svelte-jsoneditor](https://github.com/josdejong/svelte-jsoneditor), manualy connected to the app using simple Javascript. And Drag and Drop functionnalities use vue3-smooth-dnd, a Vue3 wrapper of the package with the same name vu2-smooth-dnd.

## Structure

Three main components are displayed within this app, where we can switch from the side menu :
- The main component, which has a set of buttons, a message renderer, and a JSON editor, where the message are created and modified,
- The second component is the attachment uploader helpers that helps sending files localy or from remote URL,
- The third component is an another JSON editor that display the latest exported result as specified on Meta for developper.

## Detailed
### Main interface
Severals buttons are displayed to help creating 

## Project Setup
The project is a Vuejs app created using Vite.

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### TODO
- Attachment Uploader Helper [OK]
- History Management 
- Import/Export
- Export to File
- JSON validator
- Import from valid JSON
