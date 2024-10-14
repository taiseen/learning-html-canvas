> 10 - Sep - 2023

# Snake Game - GreenBg

## Learning context:-

- JS image load
- JS audio load
- inside canvas, draw --> image at specific position
- inside canvas, draw --> object at specific position

- ## Image + Rectangle + Text
    - draw shank - from [array of {objects}], inside for loop, by calling canvas fill+stroke RECTANGLE related methods...
    - draw food - from {objects}, inside its property set random values & by calling canvas IMAGE related methods...
    - draw text score - from number & set ist positions by calling canvas TEXT related methods...

- ### For run game --> call setInterval(fun, time); // frame per second...

- ## Control Key by KeyBoard
    - event listener at document from - keyDown - event
    - keyboard navigation control based on condition for snake movement

- ## Snake Movement
    - Use Queue DataStructure, remove from last & add at 1st [pop()/unshift()]
    - pop to remove the tail...
    - unshift to add the head

- ## Snake Eat Food
    - food x & y position == to snake head x & y position then...
        - increment score &
        - without removing tail, just add new head for snake

- ## Game Over Rules
    - check collision of - 2 things...
        - 1. snake hit the wall &
        - 2. snake hit itself ==> if the new head has the same position as itself cells...