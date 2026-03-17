import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

declare const emailjs: any;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mi-proyecto-apis');

  enviarMensaje() {
    const nombre = (document.getElementById('nombre') as HTMLInputElement).value.trim();
    const email = (document.getElementById('email') as HTMLInputElement).value.trim();
    const asunto = (document.getElementById('asunto') as HTMLInputElement).value.trim();
    const mensaje = (document.getElementById('mensaje') as HTMLTextAreaElement).value.trim();

    if (!nombre || !email || !asunto || !mensaje) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const btn = document.getElementById('btnEnviar') as HTMLButtonElement;
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    emailjs.send("service_qurbphe", "template_6eaabkv", {
      name: nombre,
      email: email,
      asunto: asunto,
      message: mensaje
    }).then(() => {
      alert('¡Mensaje enviado! Me pondré en contacto contigo pronto.');
      (document.getElementById('nombre') as HTMLInputElement).value = '';
      (document.getElementById('email') as HTMLInputElement).value = '';
      (document.getElementById('asunto') as HTMLInputElement).value = '';
      (document.getElementById('mensaje') as HTMLTextAreaElement).value = '';
      btn.textContent = 'Enviar Mensaje';
      btn.disabled = false;
    }).catch((error: any) => {
      alert('Hubo un error al enviar. Por favor intenta de nuevo.');
      console.error(error);
      btn.textContent = 'Enviar Mensaje';
      btn.disabled = false;
    });
  }
}