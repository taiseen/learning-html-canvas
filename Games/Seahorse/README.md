> 17 - Sep - 2023

# SeaHorse 
### Html canvas base 2D game... [Live Link](https://seahorse-2d.netlify.app)

## Learning context:-
* Project structure
* OOP based class design
* Class base canvas call - `new Canvas()` & 

* Inside class constructor animation `loop/fps` start by:- 
    * concept of `.bind(this)` ||
    * by `arrow function = () => {}` call

* Keyboard input from user:-
    * track user key press ***"keyDown"*** & 
    * if `not present` in [array]... | `key == -1`
        * then **store** in [array] 💾
    * track user key release ***"keyUp"*** & 
    * if `present` in [array]... | `key > -1`
        * then **remove** from [array] ❌

* If user key press -
    * change player up/down (-Y,Y) direction (max) speed
    * by `key release`, player speed become 0
    * continually incrementing, player position - `vvi statement`

* Shooting bullet/leaser:-
    * user key press --- inside a method(), 
        * create `{object}` form `class` & store in `[array]`
    * by accessing/looping this [array of {object}]
        * perform `draw(context)` operation...
        * perform `update(deltaTime)` operation...
        * delete those `{object}` conditionally form this `[array of {object}]` holder

* Calculating `deltaTime`
    * difference between current & previous loop time
    * for run periodic event inside game...

* Ammo refile time calculation by the help of:-
    * `deltaTime` - game periodic event - `16-fps`     
    * `if` condition and `>` - for checking 
    * `+=` and `=` operator - for reassign values...

* Drawing game text info no need any update method
    * just by running for loop by `ammo` print it

* OOP inheritance concept 
    * child class at `1st` call `super()` method, inside its `constructor()`
        * for `merge` its parent all property values...
        * other wise, its `override` its parent `constructor()`
        * and get `no property` values form parent...
        * or `ignore` all property values form parent...

* Enemy movement:
    * start moving `right to left` side | reverse in `x` direction
    * top to bottom, but `within 90%` of game screen `hight` | `y` direction

* Player movement - vertical boundary :
    * `+height` calculation ==> player obj prevent to full out from screen `top` 
    * `-height` calculation ==> player obj prevent to full out from screen `bottom`

* Draw Player & Bullet image:
    * `frameX *` single player `width`
    * `frameY *` single player `height`
    * use this `calculation` inside `update` method (loop)

* Focus on Inheritance base method usage:
    * parent ==> have `draw()` + `update()` methods...
    * child ==> **have not** these methods...
        * but for `extends` childe `can access`/invoke this methods... 

* By destroying an object share its x,y position to another object
    * inside that position randomly generate drone object