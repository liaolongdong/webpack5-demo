!(function (e) {
  var t,
    n,
    o,
    i,
    a,
    c,
    d =
      '<svg><symbol id="icon-liebiao" viewBox="0 0 1024 1024"><path d="M334.186667 554.666667c74.666667 0 135.146667 60.501333 135.146666 135.146666v199.04a135.146667 135.146667 0 0 1-135.146666 135.168h-199.04A135.146667 135.146667 0 0 1 0 888.874667v-199.061334A135.125333 135.125333 0 0 1 135.146667 554.666667z m554.666666 0c74.666667 0 135.146667 60.501333 135.146667 135.146666v199.04a135.146667 135.146667 0 0 1-135.146667 135.168h-199.04A135.146667 135.146667 0 0 1 554.666667 888.874667v-199.061334A135.125333 135.125333 0 0 1 689.813333 554.666667z m-554.666666 85.333333h-199.04A49.792 49.792 0 0 0 85.333333 689.834667v199.04a49.813333 49.813333 0 0 0 49.813334 49.834666h199.04A49.813333 49.813333 0 0 0 384 888.874667v-199.061334A49.792 49.792 0 0 0 334.186667 640z m554.666666 0h-199.04A49.792 49.792 0 0 0 640 689.834667v199.04a49.813333 49.813333 0 0 0 49.813333 49.834666h199.04A49.813333 49.813333 0 0 0 938.666667 888.874667v-199.061334A49.792 49.792 0 0 0 888.853333 640z m-554.666666-640C408.853333 0 469.333333 60.522667 469.333333 135.168v199.04a135.146667 135.146667 0 0 1-135.146666 135.168h-199.04A135.146667 135.146667 0 0 1 0 334.208V135.146667A135.125333 135.125333 0 0 1 135.146667 0z m554.666666 0C963.52 0 1024 60.522667 1024 135.168v199.04a135.146667 135.146667 0 0 1-135.146667 135.168h-199.04A135.146667 135.146667 0 0 1 554.666667 334.208V135.146667A135.125333 135.125333 0 0 1 689.813333 0z m-554.666666 85.333333h-199.04A49.792 49.792 0 0 0 85.333333 135.168v199.04a49.813333 49.813333 0 0 0 49.813334 49.834667h199.04A49.813333 49.813333 0 0 0 384 334.208V135.146667A49.792 49.792 0 0 0 334.186667 85.333333z m554.666666 0h-199.04A49.792 49.792 0 0 0 640 135.168v199.04a49.813333 49.813333 0 0 0 49.813333 49.834667h199.04A49.813333 49.813333 0 0 0 938.666667 334.208V135.146667A49.792 49.792 0 0 0 888.853333 85.333333z"  ></path></symbol></svg>',
    l = (l = document.getElementsByTagName('script'))[
      l.length - 1
    ].getAttribute('data-injectcss')
  if (l && !e.__iconfont__svg__cssinject__) {
    e.__iconfont__svg__cssinject__ = !0
    try {
      document.write(
        '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>',
      )
    } catch (e) {
      console && console.log(e)
    }
  }
  function s() {
    a || ((a = !0), o())
  }
  ;(t = function () {
    var e, t, n, o
    ;((o = document.createElement('div')).innerHTML = d),
      (d = null),
      (n = o.getElementsByTagName('svg')[0]) &&
        (n.setAttribute('aria-hidden', 'true'),
        (n.style.position = 'absolute'),
        (n.style.width = 0),
        (n.style.height = 0),
        (n.style.overflow = 'hidden'),
        (e = n),
        (t = document.body).firstChild
          ? ((o = e), (n = t.firstChild).parentNode.insertBefore(o, n))
          : t.appendChild(e))
  }),
    document.addEventListener
      ? ~['complete', 'loaded', 'interactive'].indexOf(document.readyState)
        ? setTimeout(t, 0)
        : ((n = function () {
            document.removeEventListener('DOMContentLoaded', n, !1), t()
          }),
          document.addEventListener('DOMContentLoaded', n, !1))
      : document.attachEvent &&
        ((o = t),
        (i = e.document),
        (a = !1),
        (c = function () {
          try {
            i.documentElement.doScroll('left')
          } catch (e) {
            return void setTimeout(c, 50)
          }
          s()
        })(),
        (i.onreadystatechange = function () {
          'complete' == i.readyState && ((i.onreadystatechange = null), s())
        }))
})(window)
