let item = 0
LANDZO_TS.LcdInit(63)
LANDZO_TS.ShowString("Hello", 0, 0)
basic.forever(() => {
    item += 1
    LANDZO_TS.ShowNumber(item, 0, 1)
    basic.pause(1000)
})
