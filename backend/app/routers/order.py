from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.core.auth import get_current_user
from app.models.order import Order, OrderItem
from app.models.product import Product
from app.schemas.order import OrderCreate, OrderOut

router = APIRouter(prefix="/orders", tags=["Orders"])


@router.post("/", response_model=OrderOut)
def create_order(
    order_data: OrderCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    if not order_data.items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    user_id = current_user.get("sub")
    total_amount = 0.0
    order_items = []

    for item in order_data.items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail=f"Product {item.product_id} not found")
        if product.stock < item.quantity:
            raise HTTPException(status_code=400, detail=f"Not enough stock for {product.name}")

        total_amount += product.price * item.quantity
        order_items.append(
            OrderItem(product_id=product.id, quantity=item.quantity, price=product.price)
        )
        product.stock -= item.quantity

    new_order = Order(user_id=user_id, total_amount=total_amount, status="pending", items=order_items)

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    return new_order


@router.get("/", response_model=List[OrderOut])
def get_my_orders(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    user_id = current_user.get("sub")
    return db.query(Order).filter(Order.user_id == user_id).order_by(Order.created_at.desc()).all()