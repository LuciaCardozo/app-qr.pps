import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  toast: boolean = false;
  mensaje: string = "";
  //saldo: number = 0;
  titulo = 'Hola '+new TitleCasePipe().transform(this.auth.emailUsuarioLogeado.split('@')[0]);
  codigos: any= {'8c95def646b6127282ed50454b73240300dccabc':'10',
    'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 ':'50',
    '2786f4877b9091dcad7f35751bfcf5d5ea712b2f':'100'}
  constructor(public auth:AuthService, private barScanner:BarcodeScanner) {}  

  ngOnInit() {
    //this.cambiarDatos();
  }

  async cambiarDatos() {
    await this.auth.cambiarInfo('users',this.auth.userLoggeado.id,this.auth.userLoggeado)
  }
  leerInfo() {
    this.barScanner.scan().then( barcodeData => {
      
      if(this.auth.userLoggeado.carga10 == '' && this.codigos[barcodeData.text] == '10') {
        this.auth.userLoggeado.saldoActual = this.auth.userLoggeado.saldoActual + Number(this.codigos[barcodeData.text])
        this.auth.userLoggeado.carga10 = barcodeData.text;
        //this.auth.userLoggeado.saldoActual = this.saldo;
        this.cambiarDatos();
      } else if (this.auth.userLoggeado.carga10 != '' && this.codigos[barcodeData.text] == '10' 
        && this.auth.userLoggeado.email != 'thiago@gmail.com') {
        this.showToast('Ya se cargo el crédito, intente con otro QR',4000)
      } else if(this.auth.userLoggeado.carga50 == '' && this.codigos[barcodeData.text] == '50') {
        this.auth.userLoggeado.saldoActual = this.auth.userLoggeado.saldoActual + Number(this.codigos[barcodeData.text])
        this.auth.userLoggeado.carga50 = barcodeData.text;
   
        this.cambiarDatos();
      } else if (this.auth.userLoggeado.carga50 != '' && this.codigos[barcodeData.text] == '50' 
        && this.auth.userLoggeado.email != 'thiago@gmail.com') {
        this.showToast('Ya se cargo el crédito, intente con otro QR',4000)
      } else if(this.auth.userLoggeado.carga100 == '' && this.codigos[barcodeData.text] == '100') {
        this.auth.userLoggeado.saldoActual = this.auth.userLoggeado.saldoActual + Number(this.codigos[barcodeData.text])
        this.auth.userLoggeado.carga100 = barcodeData.text;
        this.cambiarDatos();
      } else if (this.auth.userLoggeado.carga100 != '' && this.codigos[barcodeData.text] == '100' 
        && this.auth.userLoggeado.email != 'thiago@gmail.com') {
        this.showToast('Ya se cargo el crédito, intente con otro QR',4000)
      } else if(this.auth.userLoggeado.email == 'thiago@gmail.com' && this.auth.userLoggeado.carga10 != '' &&
       this.auth.userLoggeado.carga10x2 == '' && this.codigos[barcodeData.text] == '10') {
        this.auth.userLoggeado.saldoActual = this.auth.userLoggeado.saldoActual + Number(this.codigos[barcodeData.text])
        this.auth.userLoggeado.carga10x2 = barcodeData.text;
        this.cambiarDatos();
       } else if(this.auth.userLoggeado.email == 'thiago@gmail.com' && this.auth.userLoggeado.carga10 != '' &&
       this.auth.userLoggeado.carga10x2 != '' && this.codigos[barcodeData.text] == '10') {
        this.showToast('Ya se cargo el crédito, intente con otro QR',4000)
       } else if(this.auth.userLoggeado.email == 'thiago@gmail.com' && this.auth.userLoggeado.carga50 != '' &&
       this.auth.userLoggeado.carga50x2 == '' && this.codigos[barcodeData.text] == '50') {
        this.auth.userLoggeado.saldoActual = this.auth.userLoggeado.saldoActual + Number(this.codigos[barcodeData.text])
        this.auth.userLoggeado.carga50x2 = barcodeData.text;
        this.cambiarDatos();
       } else if(this.auth.userLoggeado.email == 'thiago@gmail.com' && this.auth.userLoggeado.carga50 != '' &&
       this.auth.userLoggeado.carga50x2 != '' && this.codigos[barcodeData.text] == '50') {
        this.showToast('Ya se cargo el crédito, intente con otro QR',4000)
       } else if(this.auth.userLoggeado.email == 'thiago@gmail.com' && this.auth.userLoggeado.carga100 != '' &&
       this.auth.userLoggeado.carga100x2 == '' && this.codigos[barcodeData.text] == '100') {
        this.auth.userLoggeado.saldoActual = this.auth.userLoggeado.saldoActual + Number(this.codigos[barcodeData.text])
        this.auth.userLoggeado.carga100x2 = barcodeData.text;
        this.cambiarDatos();
       } else if(this.auth.userLoggeado.email == 'thiago@gmail.com' && this.auth.userLoggeado.carga100 != '' &&
       this.auth.userLoggeado.carga100x2 != '' && this.codigos[barcodeData.text] == '100') {
        this.showToast('Ya se cargo el crédito, intente con otro QR',4000)
       }
      
    }).catch(err=> {
      console.log(err)
    })
  }

  showToast(mensaje: string, tiempo: number) {
    this.mensaje = mensaje;
    this.toast = true;
    setTimeout(()=> {
      this.toast = false;
      this.mensaje = "";
    },tiempo)
  }

  limpiarSaldo() {
    this.auth.userLoggeado.carga10 = '';
    this.auth.userLoggeado.carga50 = '';
    this.auth.userLoggeado.carga100 = '';
    if(this.auth.userLoggeado.email == 'thiago@gmail.com') {
      this.auth.userLoggeado.carga10x2 = '';
      this.auth.userLoggeado.carga50x2 = '';
      this.auth.userLoggeado.carga100x2 = '';
    }
    this.auth.userLoggeado.saldoActual = 0;
    this.cambiarDatos();
  }
}
