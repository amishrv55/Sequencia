"""Add actual outcome fields

Revision ID: e38af93dd4cf
Revises: e98f5087b205
Create Date: 2025-04-17 15:52:19.125708

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e38af93dd4cf'
down_revision: Union[str, None] = 'e98f5087b205'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('questions', sa.Column('actual_binary', sa.String(), nullable=True))
    op.add_column('questions', sa.Column('actual_range_min', sa.Float(), nullable=True))
    op.add_column('questions', sa.Column('actual_range_max', sa.Float(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('questions', 'actual_range_max')
    op.drop_column('questions', 'actual_range_min')
    op.drop_column('questions', 'actual_binary')
    # ### end Alembic commands ###
