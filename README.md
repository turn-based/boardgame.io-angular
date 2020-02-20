
# Boardgame.io Angular Client  
  
<a href="https://www.npmjs.com/package/boardgame.io-angular"><img src="https://badge.fury.io/js/boardgame.io-angular.svg" alt="npm version"></a>  
  
Angular client for [Boardgame.io](http://boardgame.io).  
  
Checkout the [demo application](https://turn-based-209306.firebaseapp.com)

Current version (>=0.25) was built using Angular 9.
  
### Installation  
  
  
```  
$ npm install --save boardgame.io-angular boardgame.io@0.37
```  
  
  
### Usage  
  
1) Define your <span>boardgame.</span>io's framework independent [Game](https://boardgame.io/documentation/#/api/Game).
2) Define your board component that inherits BoardBase - the available properties are described at the [Client's documentation under board component](http://boardgame.io/documentation/#/api/Client):
   ```ts  
   @Component({  
     template: 'do something like {{G | json}}',  
   })  
   export class MyBoardComponent extends BoardBase {  
      // unfortunately, 
      // the following boilerplate is currently required:
      constructor(@Inject(OBSERVABLE_BOARD_CONFIG) 
                  observableBoardConfig: Observable<BoardConfig>) {  
        super(observableBoardConfig);  
      }  
    }
    ``` 
  * This board component is loaded dynamaically, so it shouldn't indirectly depend on other parts of your application. In order to define its module dependencies you need to add a module:
  
	  ```ts
	  @NgModule({
	    declarations: [MyBoardComponent],
	    imports: [CommonModule, /* other dependencies */],  
	  }) export class StupidButNeededModule {}
	  ```
    
	   (It would have been nice to be able to just specify imports on the board component; this feature is tracked by [Angular issue#33507](https://github.com/angular/angular/issues/33507)).
3) import the module in you main app:  
   ```ts  
   import { NgModule } from '@angular/core';  
   import { BoardgameIoModule } from 'boardgame.io-angular';  
     
   @NgModule({  
     declarations: [  
       MyBoardComponent  
     ],  
     imports: [  
       // ...  
	   BoardgameIoModule, // import for using bio-client  
   ]}) // Angular 9+ does not require entryComponent!
   export class MyModule {}  
   ```  
4) Use `bioGameConfig` attribute directive to setup game scope. It uses the same config as <span>boardgame.</span>io's [client factory](https://boardgame.io/documentation/#/api/Client). Use `bio-client` component to setup a [client instance](https://boardgame.io/documentation/#/api/Client): 

   ```ts  
   import { MyGame } from '.';  
   import { MyBoardComponent } from '.';  
    
   @Component({  
     template: `
       <bio-client
         [bioGameConfig]="config" gameID="single">
       </bio-client>`
   })  
   export class MyExampleComponent {
     config = {game: MyGame, board: MyBoardComponent};
   }
   ``` 
  * `bioGameConfig` can also be used setup a game scope for more than one client (useful for a multiview game and examples):
	   ```html
	 <ng-container [bioGameConfig]="config">
         <bio-client gameID="multi" playerID="0"></bio-client>`
     	 <bio-client gameID="multi" playerID="1"></bio-client>`
     </ng-container>
	 ```
   * `bioGameConfig` just assigns a config to a `GameScope` injectable. You can also directly make a `GameScope` available to `bio-client` using the `providers` property of an available module, a parent component, or a directive.
5) See [the examples](projects/demo/src/app/examples).
  
### Development

#### Running examples in this repository  
```  
$ git clone https://github.com/turn-based/boardgame.io-angular.git  
$ cd boardgame.io-angular  
$ npm i  
$ npm run build   
$ npm run start  
```  
  
For Running the multiplayer examples you'll also need to have the server running running on port 8000:  
  
```  
$ cd server  
$ npm i  
$ npm run start:dev   
```  

#### This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9 using the follwing commands :
  
1) ``` npx @angular/cli@9 new boardgame.io-angular --create-application false --prefix bio --style scss --strict --skip-tests -s -t```  
1) ```cd boardgame.io-angular```  
1) ```npx @angular/cli@9 g application demo --prefix bio --style scss --skip-tests -s -t```  
1) ```npx @angular/cli@9 g library bio-angular --prefix bio```
