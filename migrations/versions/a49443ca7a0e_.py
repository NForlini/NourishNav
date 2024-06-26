"""empty message

Revision ID: a49443ca7a0e
Revises: 48e556356496
Create Date: 2024-04-09 16:37:18.840580

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a49443ca7a0e'
down_revision = '48e556356496'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('activity_level', sa.String(length=80), nullable=True))
        batch_op.alter_column('weight',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=4),
               nullable=True)
        batch_op.drop_column('is_active')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_active', sa.BOOLEAN(), autoincrement=False, nullable=False))
        batch_op.alter_column('weight',
               existing_type=sa.String(length=4),
               type_=sa.INTEGER(),
               nullable=False)
        batch_op.drop_column('activity_level')

    # ### end Alembic commands ###
