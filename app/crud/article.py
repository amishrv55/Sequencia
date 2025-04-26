from sqlalchemy.orm import Session
from app.models.article import Article
from app.models.keyword import Keyword
from app.models.article_keyword import ArticleKeyword
from app.schemas.article import ArticleCreate

def create_article(db: Session, article_data: ArticleCreate) -> Article:
    article = Article(
        title=article_data.title,
        summary=article_data.summary,
        content=article_data.content,
        image_url=article_data.image_url,
    )
    db.add(article)
    db.flush()  # To get article.id before commit

    for kw in article_data.keywords:
        keyword = db.query(Keyword).filter_by(text=kw).first()
        if not keyword:
            keyword = Keyword(text=kw)
            db.add(keyword)
            db.flush()
        link = ArticleKeyword(article_id=article.id, keyword_id=keyword.id)
        db.add(link)

    db.commit()
    db.refresh(article)
    return {
    "id": article.id,
    "title": article.title,
    "summary": article.summary,
    "content": article.content,
    "image_url": article.image_url,
    "created_at": article.created_at,
    "keywords": [ak.keyword.text for ak in article.keywords],  # ✅ This flattens the keyword objects
}

def get_articles_by_keywords(db: Session, keyword_list: list[str]):
    return (
        db.query(Article)
        .join(ArticleKeyword)
        .join(Keyword)
        .filter(Keyword.text.in_(keyword_list))
        .distinct()
        .all()
    )
