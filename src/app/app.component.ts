import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuillEditorComponent } from 'ngx-quill';
import { QuillModule } from 'ngx-quill';
import Quill from 'quill';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [QuillEditorComponent,QuillModule,  FormsModule,
    ReactiveFormsModule], // Add this if needed],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  editorContent = new FormControl(''); // Bind the editor's content
  isHtmlMode = false; // Track whether the editor is in HTML source view
  // Quill editor modules
  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
  
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
  
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
  
      ['clean'],                                         // remove formatting button
  
      ['link', 'image', 'video'] ,                        // link and image, video
      ['source'], // Custom Source button
    ]
  };

 

  // Quill editor toolbar configuration
  // editorModules = {
  //   toolbar: [
  //     ['bold', 'italic', 'underline'], // Basic formatting
  //     [{ list: 'ordered' }, { list: 'bullet' }], // Lists
  //     ['link', 'image'], // Links and images
  //     ['source'], // Custom Source button
  //   ]
  // };

  onEditorCreated(quill: any) {
    const toolbar = quill.getModule('toolbar');

    // Create a wrapper for spacing
    const spacer = document.createElement('div');
    spacer.style.display = 'inline-block'; 
    spacer.style.paddingLeft = '5px'; 
    spacer.style.marginBottom = '-1%'; 

    // Create the custom Source button
    const button = document.createElement('button');
    button.innerHTML = 'Source';
    button.style.fontSize = '12.7px'; 
    button.style.marginLeft = '0px'; 
    button.style.padding = '0px'; 
    button.style.fontFamily='Helvetica Neue", "Helvetica", "Arial", sans-serif'
    button.onclick = () => this.toggleHtmlMode(quill);

    // Append the button to the spacer and the toolbar
    spacer.appendChild(button);
    toolbar.container.appendChild(spacer);
  }

  toggleHtmlMode(quill: any) {
    this.isHtmlMode = !this.isHtmlMode;
  
    if (this.isHtmlMode) {
      // Switch to HTML source mode
      const currentHTML = quill.root.innerHTML; // Get current HTML content
      console.log("Current HTML:", currentHTML);
      
      quill.root.textContent = currentHTML; // Replace editor content with raw HTML
      quill.enable(false); // Disable editing (readonly mode)
    } else {
      // Switch back to rich text mode
      const rawHtml = quill.root.textContent; // Get the raw HTML text
      console.log("Raw HTML:", rawHtml);
      
      quill.enable(true); // Enable editing (normal mode)
      quill.clipboard.dangerouslyPasteHTML(rawHtml); // Render HTML back into the editor
    }
  }
  

  // to add <br> between each row
  // toggleHtmlMode(quill: Quill) {
  //   this.isHtmlMode = !this.isHtmlMode; // Toggle between modes

  //   if (this.isHtmlMode) {
  //     // Switch to HTML source mode
  //     const currentHTML = quill.root.innerHTML; // Get current HTML content
  //     quill.root.textContent = this.convertToParagraphs(currentHTML); // Replace editor content with raw HTML
  //   } else {
  //     // Switch back to rich text mode
  //     const rawHtml = quill.root.textContent; // Get the raw HTML text
  //     quill.clipboard.dangerouslyPasteHTML(rawHtml); // Render HTML back into the editor
  //   }
  // }

  // convertToParagraphs(content: string): string {
  //   // Split content by new lines and wrap each line in <p> tags
  //   const lines = content.split(/\r?\n/).filter(line => line.trim() !== '');
  //   return lines.map(line => `<p>${line.trim()}</p>`).join('');
  // }


}
