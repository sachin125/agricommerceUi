import {Deserializable} from "./deserializable.model";

export class JwtResponse implements Deserializable{
	private jwt!: string;
	private username!:string;
	private userId!: Number;
	private msg!: string ;
	private authority!: Array<string>;
	private status!: string ;

	deserialize(input: any) {
		Object.assign(this, input);
		return this;
	}

	

  }
  