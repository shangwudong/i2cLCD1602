/**
 * makecode I2C LCD1602 package for microbit.
 * From microbit/micropython Chinese community.
 * http://www.micropython.org.cn
 */

enum POINT {
    O = 0,
    X = 1,
} 
    
/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon="L" block="天枢扩展模块"
namespace LANDZO_TS {
    let i2cAddr: number // 0x3F: PCF8574A, 0x27: PCF8574
    let BK: number      // backlight control
    let RS: number      // command/data

    let max7219_row1: number = 0;
    let max7219_row2: number = 0;
    let max7219_row3: number = 0;
    let max7219_row4: number = 0;
    let max7219_row5: number = 0;
    let max7219_row6: number = 0;
    let max7219_row7: number = 0;
    let max7219_row8: number = 0;
    
    const BASE_BOARD_I2C_ADDR = 0x30
    const JOY_BOARD_I2C_ADDR = 0x20
    
    export enum Keys {
        K1 = 0x01,
        K2 = 0x02,
        K3 = 0x03,
        K4 = 0x04,
        K5 = 0x05,
        K6 = 0x06,
        K7 = 0x07,
        K8 = 0x08,
        Joystick1_key = 0x09,
        Joystick2_key = 0x0A,
        Joystick1_x = 0x0B,
        Joystick1_y = 0x0C,
        Joystick2_x = 0x0D,
        Joystick2_y = 0x0E,
    }
    
    export enum IO_ANALOG_R {
        P1 = 0xb0,
        P2 = 0xb1,
        GP1 = 0xb2,
        GP2 = 0xb3,
    }
    
    export enum IO_DIGITAL_R {
        P1 = 0xb0,
        P2 = 0xb1,
        P3 = 0xc1,
        P4 = 0xc2,
        P5 = 0xc3,
        P6 = 0xc4,
        GP1 = 0xb2,
        GP2 = 0xb3,
    }
    
    export enum IO_DIGITAL_W {
        P1 = 0xb0,
        P2 = 0xb1,
        P3 = 0xc1,
        P4 = 0xc2,
        P5 = 0xc3,
        P6 = 0xc4,
    }  
    
    export enum COLUMN {
        C1 = 1,
        C2 = 2,
        C3 = 3,
        C4 = 4,
        C5 = 5,
        C6 = 6,
        C7 = 7,
        C8 = 8,
    } 
    
    export enum ROW {
        R1 = 1,
        R2 = 2,
        R3 = 3,
        R4 = 4,
        R5 = 5,
        R6 = 6,
        R7 = 7,
        R8 = 8,
    } 
    
    export enum STATE {
        SET = 0,
        RESET = 1,
    } 
    
    function joy_read(cmd: number) :number {
        let buf = pins.createBuffer(1);
        buf[0] = cmd;
        pins.i2cWriteBuffer(JOY_BOARD_I2C_ADDR, buf);
        return pins.i2cReadNumber(JOY_BOARD_I2C_ADDR, NumberFormat.UInt8BE);
    }
    
    function read_byte() :number {
        return pins.i2cReadNumber(BASE_BOARD_I2C_ADDR, NumberFormat.UInt8BE);
    }
    
    function read_half_word() :number {
        return pins.i2cReadNumber(BASE_BOARD_I2C_ADDR, NumberFormat.UInt16BE);
    }
    
    function write_byte0(cmd: number): void {
        let buf = pins.createBuffer(1);
        buf[0] = cmd;
        pins.i2cWriteBuffer(BASE_BOARD_I2C_ADDR, buf)
    }
    
    function write_byte1(cmd: number, dat: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = cmd;
        buf[1] = dat;
        pins.i2cWriteBuffer(BASE_BOARD_I2C_ADDR, buf)
    }
    
    function write_byte2(cmd: number, dat0: number, dat1: number): void {
        let buf = pins.createBuffer(3);
        buf[0] = cmd;
        buf[1] = dat0;
        buf[2] = dat1;
        pins.i2cWriteBuffer(BASE_BOARD_I2C_ADDR, buf)
    }
    
    function write_byte3(cmd: number, dat0: number, dat1: number, dat2: number): void {
        let buf = pins.createBuffer(4);
        buf[0] = cmd;
        buf[1] = dat0;
        buf[2] = dat1;
        buf[3] = dat2;
        pins.i2cWriteBuffer(BASE_BOARD_I2C_ADDR, buf)
    }
    
    //% blockId="MAX7219_show_point" block="点阵屏显示 |行 %r|列 %l|状态 %s|"
    //% weight=30 blockGap=80
    export function MAX7219_show_point(row: ROW, column: COLUMN, state: STATE): void {
        //max7219_set_point(row, column, state)
        let temp_row: number = 0;
        
        switch (row) {
            case C1: {
                temp_row = max7219_row1;
                if (state == 1) {
                    max7219_row1 |= (1 << (8-column));
                } else {
                    max7219_row1 &= ~(1 << (8-column));
                }
            }break;
            case C2: {  
                temp_row = max7219_row2;
                if (state == 1) {
                    max7219_row2 |= (1 << (8-column));
                } else {
                    max7219_row2 &= ~(1 << (8-column));
                }
            }break;
            case C3: {
                temp_row = max7219_row3;
                if (state == 1) {
                    max7219_row3 |= (1 << (8-column));
                } else {
                    max7219_row3 &= ~(1 << (8-column));
                }
            }break;
            case C4: {
                temp_row = max7219_row4;
                if (state == 1) {
                    max7219_row4 |= (1 << (8-column));
                } else {
                    max7219_row4 &= ~(1 << (8-column));
                }
            }break;
            case C5: {
                temp_row = max7219_row5;
                if (state == 1) {
                    max7219_row5 |= (1 << (8-column));
                } else {
                    max7219_row5 &= ~(1 << (8-column));
                }
            }break
            case C6: {
                temp_row = max7219_row6;
                if (state == 1) {
                    max7219_row6 |= (1 << (8-column));
                } else {
                    max7219_row6 &= ~(1 << (8-column));
                }
            }break;
            case C7: {
                temp_row = max7219_row7;
                if (state == 1) {
                    max7219_row7 |= (1 << (8-column));
                } else {
                    max7219_row7 &= ~(1 << (8-column));
                }
            }break;
            case C8: {
                temp_row = max7219_row8;
                if (state == 1) {
                    max7219_row8 |= (1 << (8-column));
                } else {
                    max7219_row8 &= ~(1 << (8-column));
                }
            }break;
        }
        write_byte2(0x72, row, temp_row);
    }
    /*
    //% blockId="MAX7219_show_line" block="点阵屏显示行 |%l|%pnt1|%pnt2|%pnt3|%pnt4|%pnt5|%pnt6|%pnt7|%pnt8|"
    //% weight=30 blockGap=80
    export function MAX7219_show_line(line: ROW, pnt1: POINT,pnt2: POINT,pnt3: POINT,pnt4: POINT,pnt5: POINT,pnt6: POINT,pnt7: POINT,pnt8: POINT): void {
        let point = pnt1<<7 + pnt2<<6 + pnt3<<5 + pnt4<<4 + pnt5<<3 + pnt6<<2 + pnt7<<1 + pnt8;
        write_byte2(0x72, line, point);
    }
    */
    /*
    //% blockId="MAX7219_show_line" block="点阵屏显示行 l %l|n %n" icon="\uf00a"
    //% weight=90 blockGap=8
    export function MAX7219_show_line(line: number, point: number): void {
        write_byte2(0x72, line, point);
    }
    */
    /*
    //% blockId="MAX7219_show" block="点阵屏显示多行 l1 %l1|l2 %l2|l3 %l3|l4 %l4|l5 %l5|l6 %l6|l7 %l7|l8 %l8" icon="\uf00a"
    //% weight=200 blockGap=8
    export function MAX7219_show(line1_dat: number, line2_dat: number, line3_dat: number, line4_dat: number, line5_dat: number, line6_dat: number, line7_dat: number, line8_dat: number): void {
        write_byte2(0x72, 1, line1_dat);
        basic.pause(1);
        write_byte2(0x72, 2, line2_dat);
        basic.pause(1);
        write_byte2(0x72, 3, line3_dat);
        basic.pause(1);
        write_byte2(0x72, 4, line4_dat);
        basic.pause(1);
        write_byte2(0x72, 5, line5_dat);
        basic.pause(1);
        write_byte2(0x72, 6, line6_dat);
        basic.pause(1);
        write_byte2(0x72, 7, line7_dat);
        basic.pause(1);
        write_byte2(0x72, 8, line8_dat);
        basic.pause(1);
    }
    */
    //% blockId="RGB" block="RGB灯 |红%r|绿%g|蓝%b"
    //% weight=90 blockGap=8
    //% r.min=0 r.max=1
    //% g.min=0 g.max=1
    //% b.min=0 b.max=1
    export function RGB(r: number, g: number, b: number) :void {
        write_byte3(0x71, r, g, b);
    }
    
    //% blockId="SMG_Off" block="关闭数码管"
    //% weight=90 blockGap=8
    export function SMG_Off() :void {
        write_byte0(0x69);
    }
    
    //% blockId="SMG" block="显示数码管 %r"
    //% weight=90 blockGap=8
    export function SMG(num: number) :void {
        write_byte2(0x70, num&0xff, num>>8);
    }
    
    //% blockId="GPIO_Read_Analog" block="|%io|端口模拟值"
    //% weight=50
    export function GPIO_Read_Analog(io: IO_ANALOG_R) :number {
        write_byte1(0x01, io);
        return read_half_word();
    }

    //% blockId="GPIO_Read_Digital" block="|%io|端口数字值"
    //% weight=50
    export function GPIO_Read_Digital(io: IO_DIGITAL_R) :number {
        write_byte1(0x02, io);
        return read_byte();
    }    

    //% blockId="GPIO_Write_Digital" block="|%io|端口数字值写入|%d|"
    //% weight=50
    export function GPIO_Write_Digital(io: IO_DIGITAL_W, value: number) :void {
        write_byte2(0x03, 0xb0, value);
    }
    
    /*
    //% blockId="General_IO1_Read_Analog" block="通用IO1读取模拟值"
    //% weight=50
    export function General_IO1_Read_Analog() :number {
        write_byte1(0x01, 0xb2);
        return read_half_word();
    }
    
    //% blockId="General_IO1_Read_Digital" block="通用IO1读取数字值"
    //% weight=50
    export function General_IO1_Read_Digital() :number {
        write_byte1(0x02, 0xb2);
        return read_byte();
    }
    
    //% blockId="General_IO2_Read_Analog" block="通用IO2读取模拟值"
    //% weight=50
    export function General_IO2_Read_Analog() :number {
        write_byte1(0x01, 0xb3);
        return read_half_word();
    }
    
    //% blockId="General_IO2_Read_Digital" block="通用IO2读取数字值"
    //% weight=50
    export function General_IO2_Read_Digital() :number {
        write_byte1(0x02, 0xb3);
        return read_byte();
    }
    
    //% blockId="P1_Read_Analog" block="P1读取模拟值"
    //% weight=50
    export function P1_Read_Analog() :number {
        write_byte1(0x01, 0xb0);
        return read_half_word();
    }
    
    //% blockId="P1_Read_Digital" block="P1读取数字值"
    //% weight=50
    export function P1_Read_Digital() :number {
        write_byte1(0x02, 0xb0);
        return read_byte();
    }
    
    //% blockId="P1_Write_Digital" block="P1数字值写 d %d"
    //% weight=50
    export function P1_Write_Digital(value: number) :void {
        write_byte2(0x03, 0xb0, value);
    }
    
    //% blockId="P2_Read_Analog" block="P2读取模拟值"
    //% weight=50
    export function P2_Read_Analog() :number {
        write_byte1(0x01, 0xb1);
        return read_half_word();
    }
    
    //% blockId="P2_Read_Digital" block="P2读取数字值"
    //% weight=50
    export function P2_Read_Digital() :number {
        write_byte1(0x02, 0xb1);
        return read_byte();
    }
    
    //% blockId="P2_Write_Digital" block="P2数字值写 d %d"
    //% weight=50
    export function P2_Write_Digital(value: number) :void {
        write_byte2(0x03, 0xb1, value);
    }
    
    //% blockId="P3_Read_Digital" block="P3读取数字值"
    //% weight=50
    export function P3_Read_Digital() :number {
        write_byte1(0x02, 0xc1);
        return read_byte();
    }
    
    //% blockId="P3_Write_Digital" block="P3数字值写 d %d"
    //% weight=50
    export function P3_Write_Digital(value: number) :void {
        write_byte2(0x03, 0xc1, value);
    }
    
    //% blockId="P4_Read_Digital" block="P4读取数字值"
    //% weight=50
    export function P4_Read_Digital() :number {
        write_byte1(0x02, 0xc2);
        return read_byte();
    }
    
    //% blockId="P4_Write_Digital" block="P4数字值写 d %d"
    //% weight=50
    export function P4_Write_Digital(value: number) :void {
        write_byte2(0x03, 0xc2, value);
    }
    
    //% blockId="P5_Read_Digital" block="P5读取数字值"
    //% weight=50
    export function P5_Read_Digital() :number {
        write_byte1(0x02, 0xc3);
        return read_byte();
    }
    
    //% blockId="P5_Write_Digital" block="P5数字值写 d %d"
    //% weight=50
    export function P5_Write_Digital(value: number) :void {
        write_byte2(0x03, 0xc3, value);
    }
    
    //% blockId="P6_Read_Digital" block="P6读取数字值"
    //% weight=50
    export function P6_Read_Digital() :number {
        write_byte1(0x02, 0xc4);
        return read_byte();
    }
    
    //% blockId="P6_Write_Digital" block="P6数字值写 d %d"
    //% weight=50
    export function P6_Write_Digital(value: number) :void {
        write_byte2(0x03, 0xc4, value);
    }
    */
    
    
    
    //% blockId="DS18B20_read" block="温度传感器数值"
    //% weight=50
    export function DS18B20() :number {
        write_byte0(0x04);
        return read_half_word();
    }
    
    //% blockId="DHT11_read_temperature" block="温湿度传感器温度数值"
    //% weight=50
    export function DHT11_temperature() :number {
        write_byte0(0x05);
        let temp = read_half_word();
        return temp & 0xff;
    }
    
    //% blockId="DHT11_read_humidity" block="温湿度传感器湿度数值"
    //% weight=50
    export function DHT11_humidity() :number {
        write_byte0(0x05);
        let humi = read_half_word();
        return humi >> 8;
    }

    //% blockId="Ultrasonic_read" block="超声波距离值"
    //% weight=50
    export function Ultrasonic() :number {
        write_byte0(0x55);
        basic.pause(500)
        return read_byte();
    }
    
    //% blockId="BlackTraker_left" block="红外寻迹1"
    //% weight=50
    export function BlackTraker_left() :number {
        write_byte0(0x52);
        let left = read_byte();
        if (left & 0x01) {
            return 1;
        }
        return 0;
    }
    
    //% blockId="BlackTraker_right" block="红外寻迹2"
    //% weight=50
    export function BlackTraker_right() :number {
        write_byte0(0x52);
        let right = read_byte();
        if (right & 0x02) {
            return 1;
        }
        return 0;
    }
    
    //% blockId="Key_read" block="读取按键|%key|状态"
    //% weight=50
    export function Key_read(key: Keys) :number {
        return joy_read(key);
    }
}
