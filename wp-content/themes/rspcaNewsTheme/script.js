jQuery(document).ready(function($){ 
  
  /* ---------------------------------------------------------------------- */
  /*  Post Pages
  /* ---------------------------------------------------------------------- */

    // Remove links from images

    jQuery(".entry-content a:has(img)").each(function() { $(this).replaceWith($(this).children());

    });
  

}); 