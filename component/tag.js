export default function Tag() {
  return (
    <>
      {/* Facebook Tag */}

      <div
        dangerouslySetInnerHTML={{
          __html: `<!-- Facebook Pixel Code -->
      <script>
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '378350410704161');
      fbq('track', 'PageView');
      </script>
      <noscript><img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=378350410704161&ev=PageView&noscript=1"
      /></noscript>
      <!-- End Facebook Pixel Code -->`,
        }}
      />
      {/* Twitter Tag */}
      <div
        dangerouslySetInnerHTML={{
          __html: `<script>
          !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
          },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='//static.ads-twitter.com/uwt.js',
          a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
          // Insert Twitter Pixel ID and Standard Event data below
          twq('init','o78eo');
          twq('track','PageView');
          </script>`,
        }}
      />
      {/* quora Tag */}
      <div
        dangerouslySetInnerHTML={{
          __html: `<!-- DO NOT MODIFY -->
      <!-- Quora Pixel Code (JS Helper) -->
      <script>
      !function(q,e,v,n,t,s){if(q.qp) return; n=q.qp=function(){n.qp?n.qp.apply(n,arguments):n.queue.push(arguments);}; n.queue=[];t=document.createElement(e);t.async=!0;t.src=v; s=document.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s);}(window, 'script', 'https://a.quora.com/qevents.js');
      qp('init', 'aa77c888af064514a7bc7bbcb50f80e3');
      qp('track', 'ViewContent');
      </script>
      <noscript><img height="1" width="1" style="display:none" src="https://q.quora.com/_/ad/aa77c888af064514a7bc7bbcb50f80e3/pixel?tag=ViewContent&noscript=1"/></noscript>
      <!-- End of Quora Pixel Code -->`,
        }}
      />
      {/* GA TAG */}
      {/* <div
        dangerouslySetInnerHTML={{
          __html: `<script async src="https://www.googletagmanager.com/gtag/js?id=G-ZEN3F008LT"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', 'G-ZEN3F008LT');
      </script>`,
        }}
      /> */}
      {/* MS clarity */}

      <div
        dangerouslySetInnerHTML={{
          __html: `<script type="text/javascript">
      (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "677n2b25tv");
  </script>`,
        }}
      />
    </>
  );
}