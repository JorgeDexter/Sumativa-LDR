import { Component, Renderer2 } from '@angular/core';
import { Database, object, ref, set } from '@angular/fire/database'; // Asegúrate de importar el método 'set'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  lightValue!: number; // Variable para almacenar el valor del sensor LDR
  dayOrNight: string = ''; // Variable para mostrar el estado de día o noche en el HTML

  constructor(private database: Database, private renderer: Renderer2) {
    // Observar cambios en el valor del sensor LDR
    const route = ref(this.database, '/Estado/Valor');
    object(route).subscribe(attributes => {
      this.lightValue = attributes.snapshot.val();
      console.log('Valor del sensor LDR:', this.lightValue);
      // Actualizar el estado según el valor del sensor LDR
      this.updateDayOrNightState();
    });
  }

  // Función para actualizar el estado de día o noche en la base de datos según el valor del sensor LDR
  updateDayOrNightState() {
    this.dayOrNight = this.lightValue <= 511.5 ? 'Día' : 'Noche';
    const newState = this.lightValue <= 511.5 ? 'day' : 'night';
    set(ref(this.database, '/Estado'), { Valor: this.lightValue, Estado: newState });

    // Aplicar clase CSS al body según el estado
    if (newState === 'day') {
      this.renderer.setStyle(document.body, 'background-color', '#f0f0f0'); // Día
      this.renderer.setStyle(document.body, 'color', '#333'); // Texto negro
      this.renderer.setStyle(document.body, 'border', 'solid'); // Texto negro
    } else {
      this.renderer.setStyle(document.body, 'background-color', '#222'); // Noche
      this.renderer.setStyle(document.body, 'border', 'solid white'); // Borde
      this.renderer.setStyle(document.body, 'border', 'solid white'); // Borde
    }
  }
}
