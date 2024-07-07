from sqlalchemy import create_engine, ForeignKey, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class Product(Base):
    __tablename__ = 'products'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    price = Column(Float)
    family_id = Column(Integer, ForeignKey('families.id'))
    category_id = Column(Integer, ForeignKey('categories.id'))
    format = Column(String)
    dots = Column(Integer)
    last_changed = Column(String)
    active = Column(Integer)

    def __init__(self, id, name, price, family_id, category_id, format, dots, last_changed, active):
        self.id = id
        self.name = name
        self.price = price
        self.family_id = family_id
        self.category_id = category_id
        self.format = format
        self.dots = dots
        self.last_changed = last_changed
        self.active = active

    def __repr__(self):
        return "<Product('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')>" % (self.name, self.price, self.family_id, self.category_id, self.format, self.dots, self.last_changed, self.active)

class Family(Base): 
    __tablename__ = 'families'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)
    last_changed = Column(String)

    def __init__(self, id, name, last_changed):
        self.id = id
        self.name = name
        self.last_changed = last_changed
            
    def __repr__(self):
        return "<Family('%s', '%s')>" % (self.name, self.last_changed)
    
class Category(Base): 
    __tablename__ = 'categories'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)

    def __init__(self, id, name):
        self.id = id
        self.name = name
            
    def __repr__(self):
        return "<Category('%s', '%s')>" % (self.name)


engine = create_engine("sqlite:///db/obrador_sm.db", echo=True, )
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()



#
#result = session.query(Product).filter(Product.name == "BISTEC MAGRO")
#for i in result:
#    print(i)

#result = session.query(Product).filter(Product.price > 9.4)
#for i in result:
#    print(i)

#result = session.query(Product).filter(Product.name.like( "%lomo%"))
#for i in result:
#    print(i)

