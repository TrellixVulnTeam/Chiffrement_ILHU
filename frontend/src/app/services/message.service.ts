import { Injectable , OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../Modèle/Client';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn : 'root'
})
export class MessageService {
  baseUrl : string = "http://127.0.0.1:1211";

  constructor(
    private socket : Socket,
  ){
  }

  etablishConnection() : void {
   this.socket.connect();
  }

  createClient(client : Client) :void{
    this.socket.emit('registClient', client);
  }


  sendMessageTo(id_client : string,id_destinataire : string , message_client : string ): void {
    this.socket.emit('sendMessageTo', {
      id_envoyeur : id_client ,
      id_destinataire : id_destinataire,
      message : message_client 
    })
  }

  broadCastMessage(idclient : string, message : string ) : void {
    this.socket.emit('broadcastMessage' ,{
      "id_envoyeur" : idclient,
      "message":  message
    });
  }

 
  getClient(id : string): Client {
   return this.socket.emit('getClient', id);
  }
  


  ngOnInit(){

  }


}