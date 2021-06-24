import {OrderItem} from "./orderItem";

export class Order {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public total: number,
    public order_items: OrderItem[]
  ) {
  }
}