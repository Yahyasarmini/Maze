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
