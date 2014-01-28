from django.conf.urls import patterns, url
from Homepage import views

urlpatterns = patterns('',
                       url(r'^$',views.homepage ,name="home"),
                       url(r'^Home$', 'homepage'),
                       url(r'^Home/$','homepage'),
                       url(r'^test/$',views.testpage, name="test"),
                       url(r'^test2/$',views.testpage2, name = "test2"),
)
