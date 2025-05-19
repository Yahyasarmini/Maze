/*
window.addEventListener('load',() => maze.init());

const maze = {
    init(){
        const body = document.body;
        const header = this.generateHeader('Maze', 'by Yahya Sarmini');
        const main = this.generateMain();
        const footer = this.generateFooter('&copy 2023 by Yahya Sarmini');
        body.appendChild(header);
        body.appendChild(main);
        body.appendChild(footer);
        this.maze=remoteMaze;
        //this.generateField(7,7);
        this.newMaze(7,7);
        return body;
    },
        generateHeader(title,subtitle){
        var header = document.createElement('header');
        const limiter = this.elementWithClasses("div" , "limiter header" );
        const H1 = document.createElement("H1");
        H1.innerText = title;
        const H2 = document.createElement("H2");
        H2.innerText = subtitle;
        limiter.appendChild(H1);
        limiter.appendChild(H2);
        header.appendChild(limiter);
        return header;
    },
    generateMain(){
        var main = document.createElement('main');
        const limiter = this.elementWithClasses("div", "limiter main");
        
        const cellFieldset = this.generateMazeFieldset();
        limiter.appendChild(cellFieldset);
        
        const controlFieldset = this.generateControlsFieldset();
        limiter.appendChild(controlFieldset);
        
        main.appendChild(limiter);
        return main;
    },
    generateFooter(title){
        var footer = document.createElement('footer');
        const limiter = this.elementWithClasses("div", "limter footer");
        limiter.innerHTML = title;
        footer.appendChild(limiter);
        return footer;
    },

    generateMazeFieldset(){
        const fieldset = this.makeFieldset('Maze');
        const field = this.elementWithClasses("div", "field");
        fieldset.appendChild(field);
        const sizebar = this.generatesizebar();
        fieldset.appendChild(sizebar);
        return fieldset;
    },
    generatesizebar(){
        const sizebar = this.elementWithClasses("div","size-bar");
        const BTNsmall = this.generatebutton('small','btnsmall');
        const BTNmedium = this.generatebutton('medium','btnmedium');
        const BTNlarge = this.generatebutton('large','btnlarge');
        const BTNHuge = this.generatebutton('huge','btnhuge');
        sizebar.appendChild(BTNsmall);
        sizebar.appendChild(BTNmedium);
        sizebar.appendChild(BTNlarge);
        sizebar.appendChild(BTNHuge);
        BTNsmall.addEventListener("click", () => {this.newMaze(7,7)});
        BTNmedium.addEventListener("click", () => {this.newMaze(13,13)});
        BTNlarge.addEventListener("click", () => {this.newMaze(25,25)});
        BTNHuge.addEventListener("click", () => {this.newMaze(45,45)});


        return sizebar;
    },
    
    generatebutton(text,id){
        const button = document.createElement('button'); 
        button.type = "type";
        button.innerText = text;
        if(id == undefined){
            false;
        }      
        button.id = id;
        return button;
    },
    

    makeFieldset(title) {
        const fieldset = document.createElement('fieldset');
        const legend = document.createElement('legend');
        legend.innerText = title;
        fieldset.appendChild(legend);
        return fieldset;
    },
    generateControlsFieldset(){
        const fieldset = this.makeFieldset('Controls');
        const communication = this.makeFieldset('Communication');
        const emptypara = document.createElement('p');
        emptypara.id = "communications";
        const controls = this.generateControls();
        fieldset.appendChild(controls);
        communication.appendChild(emptypara);
        fieldset.appendChild(communication);
        
        return fieldset;

    },

     
    

    generateControls(){
        const controls = this.elementWithClasses("div","control-holder , square-holder");
        const sizer = this.elementWithClasses("div","square-sizer");
        const content = this.elementWithClasses("div","control-content , square-content");
        const arrowup = this.elementWithClasses("div","direction arrow up");
        content.appendChild(this.elementWithClasses("div","direction-spacer"));
        const arrowleft = this.elementWithClasses("div","direction arrow left");
        content.appendChild(this.elementWithClasses("div","direction-spacer"));
        const arrowright = this.elementWithClasses("div","direction arrow right");
        const arrowdown = this.elementWithClasses("div","direction arrow down");
        const player_symbol = this.elementWithClasses("div","direction arrow player");
        
        
        controls.appendChild(sizer);
        sizer.appendChild(content);
        content.appendChild(this.elementWithClasses("div", "direction spacer"));
        content.appendChild(arrowup);
        content.appendChild(this.elementWithClasses("div", "direction spacer"));
        content.appendChild(arrowleft);
        content.appendChild(player_symbol);
        content.appendChild(arrowright);
        content.appendChild(this.elementWithClasses("div", "direction spacer"));
        
        content.appendChild(arrowdown);
        content.appendChild(this.elementWithClasses("div", "direction spacer"));

        player_symbol.addEventListener("click",() => this.solve(0,0));
        arrowup.addEventListener("click",() => {this.mazeMove(-1,0)});
        arrowleft.addEventListener("click",() => {this.mazeMove(0,-1)});
        arrowright.addEventListener("click",() => {this.mazeMove(0,1)});
        arrowdown.addEventListener("click",() => {this.mazeMove(1,0)});

        return controls;

    },


    generateField(width, height) {
        const oldField = document.querySelector(".field");
        const newField = this.elementWithClasses ("div", "field");
        for (var row = 0; row < height; row ++){
            newField.appendChild(this.generateRow(row,height));
        }
        oldField.replaceWith(newField);   

        document.querySelectorAll('div.row').forEach(element =>{
            element.style.width = `calc(100% / ${width})`;
        });
        return newField;
    },

    generateRow(Rowindex,width) {
        const row = this.elementWithClasses("div", "row");
        for (let colum = 0; colum < width; colum++) {
            row.appendChild(this.generateCell(Rowindex,colum));
        }
        return row;
    },
    generateCell(rowIndex,colum){
        const squareHolder = this.elementWithClasses("div", "square-holder");
        const squareSizer = this.elementWithClasses("div", "square-sizer");
        const squareContent = this.elementWithClasses("div", "cell square-content");

        squareHolder.appendChild(squareSizer);
        squareHolder.appendChild(squareContent);

        squareContent.dataset.x = colum;
        squareContent.dataset.y = rowIndex;
        
        

        return squareHolder;
    },
    
    async newMaze(width,height){
        this.generateField(width,height);
        var Width = width;
        var Height = height;
        
        const {playerX , playerY} = await this.maze.generate(width,height);

        this.positionplayer(playerX,playerY);
        
    },    


    positionplayer(x, y) {
        this.playerX = x;
        this.playerY = y;
    
        const playerCell = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
        
        const oldPlayer = document.querySelector('.square-content.player');
        if(oldPlayer){
            oldPlayer.classList.remove("player");
        }
        if(playerCell){
            playerCell.classList.remove("cell");
            playerCell.classList.add("way");
            playerCell.classList.add("player");
        }
        
    },
   
    elementWithClasses(elementType,classnames){
        const element = document.createElement(elementType);
        classnames.split(" ").forEach(classnames => 
            {
            element.classList.add(classnames);
             }
        );
        return element;
        
    },
    
    showpopUp(text){
        const popup = this.elementWithClasses("div","pop-up");
        const div = document.createElement('div');
        const Textdiv = document.createElement("div");
        Textdiv.innerText= text;
        const button = this.generatebutton("replay","btn-replay");
        div.appendChild(Textdiv);
        div.appendChild(button);
        popup.appendChild(div);
        document.body.appendChild(popup);
        button.addEventListener("click", ()=> this.replay());
        
    },
    replay(){
        this.newMaze(7,7);
        this.hidepopup();
    },

    hidepopup(){
        const popup = document.querySelector(".pop-up");
        popup.remove();
    },


    
     async mazeMove(dx,dy){
        const oldPlayer = document.querySelector(`[data-x= "${this.maze.playerX}"][data-y= "${this.maze.playerY}"]`);
        const newX = this.playerX + dx;
        const newY = this.playerY + dy;

        
        const decompose = await this.maze.move(dx,dy);
        const cell = decompose.code.cell;
        document.getElementById("communications");
        switch (cell) {
            case 0:
                this.positionplayer(newX,newY);
                
                break;
                case 1:
                    this.positionplayer(newX,newY);
                    
                    this.showpopUp("You won !");
                    break;
                case 2:
                    this.markasWall(newX,newY);
                    break;
            default:
                alert("Impossible switch value !");
                break;
        }
        
    },
    
    markasWall(x,y){
       const wallCell = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
       if(wallCell) {
        wallCell.classList.remove("cell");
        wallCell.classList.add("wall");
        }
    },

    directions: [{dx:1,dy:0},{dx:-1,dy:0},{dx:0,dy:-1},{dx:0,dy:1}],
    
    async solve(Fromdx,Fromdy){
        const oldX = this.playerX;
        const oldY = this.playerY; 
        for(const i of this.directions){
            if(i.dx == -Fromdx && i.dy == -Fromdy){
                continue;
            }
            
            const newX = oldX + i.dx;
            const newY = oldY + i.dy;
            
            const cell = await this.maze.move(i.dx,i.dy); ;
            switch (cell.code.cell) {
                case 0:
                    this.positionplayer(newX,newY);
                    const solved = await this.solve(i.dx,i.dy);
                    if (solved) {
                        return Promise.resolve(true);
                    }
                    await this.maze.move(-i.dx,-i.dy);
                    this.positionplayer(oldX,oldY);
                    break;
                    case 1:
                        this.positionplayer(newX,newY);
                        this.showpopUp("maze solved");
                        return Promise.resolve(true);
                    case 2:
                        this.markasWall(newX,newY);
                        break;
            }
             Promise.resolve(false);
        }

    },
    
    
};

const remoteMaze = {
    URL: "https://www2.hs-esslingen.de/~melcher/it/maze/",
    token: null,
    async FetchandDecode(request) {
        const response = await fetch(this.URL + "?" + request);
        return response.json(); 
    },
    async generate(width, height) {
        const ret = await this.FetchandDecode(`request=generate&userid=yasait01&width=${width}&height=${height}`);
        this.token = ret.token;
        return ret;
    },
    async move(dx, dy) {
        const ret = await this.FetchandDecode(`request=move&token=${this.token}&dx=${dx}&dy=${dy}`);
        return ret;
    }
};





const localmaze = {
    playerX: 1,
    playerY: 1, 

    maze: [
        [ 2, 2, 2, 2, 2, 2, 2 ],
        [ 2, 0, 0, 0, 2, 0, 2 ],
        [ 2, 0, 2, 0, 2, 0, 2 ],
        [ 2, 0, 2, 0, 0, 0, 2 ],
        [ 2, 0, 2, 2, 2, 0, 2 ],
        [ 2, 0, 0, 1, 2, 0, 2 ],
        [ 2, 2, 2, 2, 2, 2, 2 ],
    ],
     async generate(width, height){
        this.playerX = 1;
        this.playerY = 1;
        
        return new Promise(resolve => {
            window.setTimeout(() =>
            resolve({playerX:this.playerX, playerY:this.playerY}),200
            );
            
        });
        
    },

    
    
     async move(dx, dy){
        if(dx < -1 || dx > 1 || dy < -1 || dy > +1)
            alert('to big move');
        const newX = this.playerX + dx
        const newY = this.playerY + dy
        
        const cell = this.maze[newY][newX];
        if (cell == 0 || cell == 1){
            this.playerX = newX;
            this.playerY = newY;
        }
        
        return new Promise(resolve => {
            window.setTimeout(() =>
            resolve({cell, playerX:this.playerX, playerY:this.playerY}),200
            );
        });
        
    }
    
}
*/

window.addEventListener('load',() => maze.init());

const maze = {
    init(){
        const body = document.body;
        const header = this.generateHeader('Maze', 'by Yahya Sarmini');
        const main = this.generateMain();
        const footer = this.generateFooter('&copy; 2023 by Yahya Sarmini');
        body.appendChild(header);
        body.appendChild(main);
        body.appendChild(footer);
        
        // this.maze = remoteMaze; // Für Online-Version
        this.maze = localmaze;   // Für Offline-Version
        
        this.newMaze(7,7);
        return body;
    },
    
    generateHeader(title, subtitle){
        var header = document.createElement('header');
        const limiter = this.elementWithClasses("div", "limiter header");
        const H1 = document.createElement("h1");
        H1.innerText = title;
        const H2 = document.createElement("h2");
        H2.innerText = subtitle;
        limiter.appendChild(H1);
        limiter.appendChild(H2);
        header.appendChild(limiter);
        return header;
    },
    
    generateMain(){
        var main = document.createElement('main');
        const limiter = this.elementWithClasses("div", "limiter main");
        
        const cellFieldset = this.generateMazeFieldset();
        limiter.appendChild(cellFieldset);
        
        const controlFieldset = this.generateControlsFieldset();
        limiter.appendChild(controlFieldset);
        
        main.appendChild(limiter);
        return main;
    },
    
    generateFooter(title){
        var footer = document.createElement('footer');
        const limiter = this.elementWithClasses("div", "limiter footer");
        limiter.innerHTML = title;
        footer.appendChild(limiter);
        return footer;
    },

    generateMazeFieldset(){
        const fieldset = this.makeFieldset('Maze');
        const field = this.elementWithClasses("div", "field");
        fieldset.appendChild(field);
        const sizebar = this.generatesizebar();
        fieldset.appendChild(sizebar);
        return fieldset;
    },
    
    generatesizebar(){
        const sizebar = this.elementWithClasses("div", "size-bar");
        const BTNsmall = this.generatebutton('small', 'btnsmall');
        const BTNmedium = this.generatebutton('medium', 'btnmedium');
        const BTNlarge = this.generatebutton('large', 'btnlarge');
        const BTNHuge = this.generatebutton('huge', 'btnhuge');
        sizebar.appendChild(BTNsmall);
        sizebar.appendChild(BTNmedium);
        sizebar.appendChild(BTNlarge);
        sizebar.appendChild(BTNHuge);
        BTNsmall.addEventListener("click", () => {this.newMaze(7,7)});
        BTNmedium.addEventListener("click", () => {this.newMaze(13,13)});
        BTNlarge.addEventListener("click", () => {this.newMaze(25,25)});
        BTNHuge.addEventListener("click", () => {this.newMaze(45,45)});

        return sizebar;
    },
    
    generatebutton(text, id){
        const button = document.createElement('button'); 
        button.type = "button";
        button.innerText = text;
        if(id !== undefined){
            button.id = id;
        }
        return button;
    },
    
    makeFieldset(title) {
        const fieldset = document.createElement('fieldset');
        const legend = document.createElement('legend');
        legend.innerText = title;
        fieldset.appendChild(legend);
        return fieldset;
    },
    
    generateControlsFieldset(){
        const fieldset = this.makeFieldset('Controls');
        const communication = this.makeFieldset('Communication');
        const emptypara = document.createElement('p');
        emptypara.id = "communications";
        const controls = this.generateControls();
        fieldset.appendChild(controls);
        communication.appendChild(emptypara);
        fieldset.appendChild(communication);
        
        return fieldset;
    },

    generateControls(){
        const controls = this.elementWithClasses("div", "control-holder square-holder");
        const sizer = this.elementWithClasses("div", "square-sizer");
        const content = this.elementWithClasses("div", "control-content square-content");
        
        controls.appendChild(sizer);
        sizer.appendChild(content);
        
        content.appendChild(this.elementWithClasses("div", "direction spacer"));
        
        const arrowup = this.elementWithClasses("div", "direction arrow up");
        content.appendChild(arrowup);
        
        content.appendChild(this.elementWithClasses("div", "direction spacer"));
        
        const arrowleft = this.elementWithClasses("div", "direction arrow left");
        content.appendChild(arrowleft);
        
        const player_symbol = this.elementWithClasses("div", "direction arrow player");
        content.appendChild(player_symbol);
        
        const arrowright = this.elementWithClasses("div", "direction arrow right");
        content.appendChild(arrowright);
        
        content.appendChild(this.elementWithClasses("div", "direction spacer"));
        
        const arrowdown = this.elementWithClasses("div", "direction arrow down");
        content.appendChild(arrowdown);
        
        content.appendChild(this.elementWithClasses("div", "direction spacer"));

        player_symbol.addEventListener("click", () => this.solve());
        arrowup.addEventListener("click", () => {this.mazeMove(-1, 0)});
        arrowleft.addEventListener("click", () => {this.mazeMove(0, -1)});
        arrowright.addEventListener("click", () => {this.mazeMove(0, 1)});
        arrowdown.addEventListener("click", () => {this.mazeMove(1, 0)});

        return controls;
    },

    generateField(width, height) {
        const oldField = document.querySelector(".field");
        const newField = this.elementWithClasses("div", "field");
        for (var row = 0; row < height; row++){
            newField.appendChild(this.generateRow(row, width));
        }
        oldField.replaceWith(newField);   

        document.querySelectorAll('div.row').forEach(element => {
            element.style.width = `calc(100% / ${width})`;
        });
        return newField;
    },

    generateRow(rowIndex, width) {
        const row = this.elementWithClasses("div", "row");
        for (let column = 0; column < width; column++) {
            row.appendChild(this.generateCell(rowIndex, column));
        }
        return row;
    },
    
    generateCell(rowIndex, column){
        const squareHolder = this.elementWithClasses("div", "square-holder");
        const squareSizer = this.elementWithClasses("div", "square-sizer");
        const squareContent = this.elementWithClasses("div", "cell square-content");

        squareHolder.appendChild(squareSizer);
        squareHolder.appendChild(squareContent);

        squareContent.dataset.x = column;
        squareContent.dataset.y = rowIndex;
        
        return squareHolder;
    },
    
    async newMaze(width, height){
        this.generateField(width, height);
        try {
            const result = await this.maze.generate(width, height);
            this.positionplayer(result.playerX, result.playerY);
        } catch (error) {
            console.error("Fehler beim Generieren des Labyrinths:", error);
            // Fallback-Position
            this.positionplayer(1, 1);
        }
    },    

    positionplayer(x, y) {
        this.playerX = x;
        this.playerY = y;
    
        const playerCell = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
        
        const oldPlayer = document.querySelector('.square-content.player');
        if(oldPlayer){
            oldPlayer.classList.remove("player");
        }
        if(playerCell){
            playerCell.classList.remove("cell");
            playerCell.classList.add("way");
            playerCell.classList.add("player");
        }
    },
   
    elementWithClasses(elementType, classnames){
        const element = document.createElement(elementType);
        if (classnames) {
            classnames.split(",").forEach(classStr => {
                classStr.trim().split(" ").forEach(className => {
                    if (className) {
                        element.classList.add(className);
                    }
                });
            });
        }
        return element;
    },
    
    showpopUp(text){
        // Entferne vorherige Popups, falls vorhanden
        this.hidepopup();
        
        const popup = this.elementWithClasses("div", "pop-up");
        const div = document.createElement('div');
        const Textdiv = document.createElement("div");
        Textdiv.innerText = text;
        const button = this.generatebutton("replay", "btn-replay");
        div.appendChild(Textdiv);
        div.appendChild(button);
        popup.appendChild(div);
        document.body.appendChild(popup);
        button.addEventListener("click", () => this.replay());
    },
    
    replay(){
        this.newMaze(7,7);
        this.hidepopup();
    },

    hidepopup(){
        const popup = document.querySelector(".pop-up");
        if (popup) {
            popup.remove();
        }
    },
    
    async mazeMove(dx, dy){
        const newX = this.playerX + dx;
        const newY = this.playerY + dy;
        
        try {
            const response = await this.maze.move(dx, dy);
            let cellType;
            
            // Vereinfachter Ansatz für API-Antworten
            if (response && typeof response.cell === 'number') {
                cellType = response.cell;
            } else if (response && response.code && typeof response.code.cell === 'number') {
                cellType = response.code.cell;
            } else {
                console.error("Unerwartete Antwortstruktur:", response);
                return;
            }
            
            switch (cellType) {
                case 0:
                    this.positionplayer(newX, newY);
                    break;
                case 1:
                    this.positionplayer(newX, newY);
                    this.showpopUp("You won!");
                    break;
                case 2:
                    this.markasWall(newX, newY);
                    break;
                default:
                    console.error("Unbekannter Zellentyp:", cellType);
                    break;
            }
        } catch (error) {
            console.error("Fehler beim Bewegen:", error);
        }
    },
    
    markasWall(x, y){
        const wallCell = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
        if(wallCell) {
            wallCell.classList.remove("cell");
            wallCell.classList.add("wall");
        }
    },

    directions: [{dx:1,dy:0},{dx:-1,dy:0},{dx:0,dy:-1},{dx:0,dy:1}],
    
    // Hilfsfunktion zum Verzögern für Animation
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    
    // Speichert besuchte Zellen beim Autosolve
    solveHistory: {},  
    
    // Neuer, vereinfachter Autosolve-Algorithmus mit Rekursion, aber mit klarer Struktur
    async solve() {
        // Rückverfolgungsgeschichte leeren
        this.solveHistory = {};
        
        // Startfunktion aufrufen
        console.log("Starting maze solve at position:", this.playerX, this.playerY);
        const solved = await this.solveStep(this.playerX, this.playerY);
        
        if (!solved) {
            console.log("No solution found");
            alert("Konnte keine Lösung finden!");
        }
        return solved;
    },
    
    // Hilfsfunktion für den rekursiven Lösungsalgorithmus
    async solveStep(x, y) {
        // Aktuelle Position als Schlüssel verwenden
        const posKey = `${x},${y}`;
        
        // Bereits besuchte Position?
        if (this.solveHistory[posKey]) {
            return false;
        }
        
        // Position als besucht markieren
        this.solveHistory[posKey] = true;
        
        // Alle 4 möglichen Richtungen ausprobieren (in einer festen Reihenfolge für Konsistenz)
        const directions = [
            {dx: 0, dy: -1, name: "up"},    // Oben
            {dx: 1, dy: 0, name: "right"},  // Rechts
            {dx: 0, dy: 1, name: "down"},   // Unten
            {dx: -1, dy: 0, name: "left"}   // Links
        ];
        
        for (const dir of directions) {
            console.log(`Trying direction: ${dir.name} from position ${x},${y}`);
            
            // In diese Richtung bewegen
            try {
                const result = await this.maze.move(dir.dx, dir.dy);
                const newX = x + dir.dx;
                const newY = y + dir.dy;
                
                // Zellentyp aus der Antwort extrahieren
                let cellType;
                if (result && typeof result.cell === 'number') {
                    cellType = result.cell;
                } else if (result && result.code && typeof result.code.cell === 'number') {
                    cellType = result.code.cell;
                } else {
                    console.error("Unerwartete Antwortstruktur:", result);
                    continue; // Mit nächster Richtung fortfahren
                }
                
                // Reaktion basierend auf dem Zellentyp
                if (cellType === 0) { // Freier Pfad
                    // Spieler visuell bewegen
                    this.positionplayer(newX, newY);
                    await this.sleep(200); // Kurze Pause für Animation
                    
                    // Rekursiv von hier aus weitermachen
                    const solved = await this.solveStep(newX, newY);
                    
                    if (solved) {
                        return true; // Lösung gefunden!
                    }
                    
                    // Wenn keine Lösung gefunden wurde, gehe zurück
                    console.log(`Moving back from ${newX},${newY} to ${x},${y}`);
                    await this.maze.move(-dir.dx, -dir.dy);
                    this.positionplayer(x, y);
                    await this.sleep(100); // Kurze Pause für Animation
                }
                else if (cellType === 1) { // Ziel gefunden
                    console.log("Target found!");
                    this.positionplayer(newX, newY);
                    await this.sleep(300); // Längere Pause am Ende
                    this.showpopUp("Maze solved!");
                    return true;
                }
                else if (cellType === 2) { // Wand
                    this.markasWall(newX, newY);
                }
            } catch (error) {
                console.error("Fehler bei der Bewegung:", error);
            }
        }
        
        // Wenn wir hier ankommen, wurde keine Lösung gefunden
        return false;
    }
};

// Einfaches Lokales Maze ohne Netzwerkanfragen für zuverlässiges Verhalten
const localmaze = {
    playerX: 1,
    playerY: 1, 

    maze: [
        [ 2, 2, 2, 2, 2, 2, 2 ],
        [ 2, 0, 0, 0, 2, 0, 2 ],
        [ 2, 0, 2, 0, 2, 0, 2 ],
        [ 2, 0, 2, 0, 0, 0, 2 ],
        [ 2, 0, 2, 2, 2, 0, 2 ],
        [ 2, 0, 0, 1, 2, 0, 2 ],
        [ 2, 2, 2, 2, 2, 2, 2 ],
    ],
    
    // Größeres Maze für weitere Tests
    biggerMaze: [
        [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
        [ 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
        [ 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2 ],
        [ 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2 ],
        [ 2, 0, 2, 0, 2, 2, 2, 2, 2, 0, 2, 0, 2 ],
        [ 2, 0, 2, 0, 2, 0, 0, 0, 2, 0, 2, 0, 2 ],
        [ 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2 ],
        [ 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2 ],
        [ 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2 ],
        [ 2, 0, 2, 0, 2, 0, 2, 0, 0, 0, 2, 0, 2 ],
        [ 2, 0, 2, 0, 2, 0, 2, 2, 2, 2, 2, 0, 2 ],
        [ 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 2 ],
        [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
    ],
    
    currentMaze: null,
    
    async generate(width, height) {
        this.playerX = 1;
        this.playerY = 1;
        
        // Auswählen des passenden Labyrinths basierend auf der Größe
        if (width <= 7) {
            this.currentMaze = this.maze;
        } else {
            this.currentMaze = this.biggerMaze;
        }
        
        return Promise.resolve({
            playerX: this.playerX, 
            playerY: this.playerY
        });
    },
    
    async move(dx, dy) {
        if (dx < -1 || dx > 1 || dy < -1 || dy > 1) {
            console.error('Zu großer Bewegungsschritt');
            return { cell: 2 };
        }
        
        const newX = this.playerX + dx;
        const newY = this.playerY + dy;
        
        // Grenzen prüfen
        if (newY < 0 || newY >= this.currentMaze.length || 
            newX < 0 || newX >= this.currentMaze[0].length) {
            return { cell: 2 };
        }
        
        const cell = this.currentMaze[newY][newX];
        
        // Spielerposition aktualisieren, wenn kein Hindernis
        if (cell === 0 || cell === 1) {
            this.playerX = newX;
            this.playerY = newY;
        }
        
        return Promise.resolve({ cell });
    }
};

// Remote Maze-Implementation - nur verwenden, wenn der Server zuverlässig ist
const remoteMaze = {
    URL: "https://www2.hs-esslingen.de/~melcher/it/maze/",
    token: null,
    playerX: 0,
    playerY: 0,
    
    async FetchandDecode(request) {
        try {
            const response = await fetch(this.URL + "?" + request);
            return await response.json();
        } catch (error) {
            console.error("API-Fehler:", error);
            return null;
        }
    },
    
    async generate(width, height) {
        try {
            const ret = await this.FetchandDecode(`request=generate&userid=yasait01&width=${width}&height=${height}`);
            if (ret && ret.token) {
                this.token = ret.token;
                this.playerX = ret.playerX;
                this.playerY = ret.playerY;
                return ret;
            } else {
                console.error("Ungültige API-Antwort:", ret);
                return { playerX: 1, playerY: 1 };
            }
        } catch (error) {
            console.error("Fehler beim Generieren:", error);
            return { playerX: 1, playerY: 1 };
        }
    },
    
    async move(dx, dy) {
        if (!this.token) {
            console.error("Kein token vorhanden, kann nicht bewegen");
            return { cell: 2 };
        }
        
        try {
            const ret = await this.FetchandDecode(`request=move&token=${this.token}&dx=${dx}&dy=${dy}`);
            if (ret && ret.code && ret.code.cell !== undefined) {
                if (ret.code.cell !== 2) {
                    this.playerX += dx;
                    this.playerY += dy;
                }
                return ret;
            } else {
                console.error("Ungültige Move-Antwort:", ret);
                return { cell: 2 };
            }
        } catch (error) {
            console.error("Fehler beim Bewegen:", error);
            return { cell: 2 };
        }
    }
};