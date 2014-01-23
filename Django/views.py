# Create your views here.

from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import get_object_or_404, render_to_response
from django.template import RequestContext
from django.utils import simplejson
from django.views import generic
from django.conf import settings

import base64
import json
import urllib2
from urlparse import urlparse
import re
import sys

import sys
sys.path.insert(0, '/home/binderd/webgl/scripts/')

from GET import thing, vertex

def base_url(request):
    """Adds the base url to the context."""
    base_url = settings.BASE_URL
    return {'BASE_URL': base_url}

def homepage(request):
    return render_to_response('home.html', context_instance = RequestContext(request))

def testpage(request):
    if request.method == "GET":
        return render_to_response('test.html', context_instance = RequestContext(request))
    elif request.method == "POST":
        return HttpResponse(content = thing(),mimetype="application/json")        

