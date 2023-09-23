> 17 - Sep - 2023

# SeaHorse 
### Html canvas base 2D game... 


## Learning context:-
* Project structure
* OOP based class design
* Class base canvas call - `new Canvas()` & 

* Inside class constructor animation `loop/fps` start by:- 
    * concept of `.bind(this)` ||
    * by `arrow function = () => {}` call

* Keyboard input from user:-
    * track user key press & if `not present` in [array]... | `key == -1`
        * then store in [array]
    * track user key release & if `present` in [array]... | `key > -1`
        * then remove from [array]

* If user key press -
    * change player up/down (-Y,Y) direction (max) speed
    * by `key release`, player speed become 0
    * continually incrementing player position - `vvi statement`

* Shooting bullet/leaser:-
    * user key press --- inside a method(), 
        * create {object} form class & store in [array]
    * by accessing/looping this [array of {object}]
        * perform draw() operation...
        * perform update() operation...
        * delete those object conditionally form this [array of {object}]

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

* Draw Player & Bullet image 
    * `frameX *` single player `width`
    * `frameY *` single player `height`
