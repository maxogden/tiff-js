'use strict';

const OutputBuffer = require('iobuffer').OutputBuffer;

class TIFFEncoder extends OutputBuffer {
    constructor() {
        super();
        this._images = [];
        this._array = null;
    }

    addImage(image) {
        this._images.push(image);
    }

    encode() {
        if (this._array) return this._array;
        this.encodeHeader();
        for (var i = 0; i < this._images.length; i++) {
            this.encodeIFD(this._images[i]);
        }
        this.writeUint32(0);
        this._array = this.toArray();
        return this._array;
    }

    encodeHeader() {
        this.setLittleEndian();
        this.writeUint16(0x4949);  // endianess
        this.writeUint16(42);  // magic number
    }

    encodeIFD(ifd) {
        this.writeUint32(this.offset + 4); // next IFD offset
        this.encodeIFDEntry(256, shortOrLong(image.width), 1, image.width);
        this.encodeIFDEntry(257, shortOrLong(image.height), 1, image.height);
        this.encodeIFDEntry(258, 3, 1, image.bitDepth);
        this.encodeIFDEntry(259, 3, 1, 1); // Compression
        this.encodeIFDEntry(262, 3, 1, 1); // PhotometricInterpretation
    }

    encodeIFDEntry(tag, type, v) {

    }

    writeShort() {

    }


}

module.exports = TIFFEncoder;

function shortOrLong(value) {
    return value > 0xffff ? 4 : 3;
}
