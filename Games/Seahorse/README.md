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
    * track user key press & if `not present` in [array]...
        * then store in [array]
    * track user key release & if `present` in [array]...
        * then remove from [array]

* If user key press -
    * change player up/down (-Y,Y) direction (max) speed
    * by key release, player speed become 0
    * continually incrementing player position - `vvi statement`

* Shooting bullet/leaser:-
    * user key press --- inside a method(), 
        * create {object} form class & store in [array]
    * by accessing/looping this [array of {object}]
        * perform draw() operation...
        * perform update() operation...
        * delete those object conditionally form this [array of {object}]

