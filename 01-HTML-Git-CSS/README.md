# CHANGES

## HTML
  1.	Changed the websites title from >Website< to >Horiseon<

  2.	Added alt text to every image. Added a title to the section which should serve as alt text for the background-image.

  3.	Added semantic elements (header, section, and footer) to replace divs. This allowed me to remove the footer and header classes as well (noted in CSS)

  4.	Added id="search-engine-optimization" to the first div in content class so navigation would work.

  5.	Removed /img in the benefits section and used /> instead

  6.	Removed many unnecessary classes (see CSS) 

  7.  Changed the footer h2 to an h4 (see CSS)

  8.	Applied the generic VS Code "Format Document"

## CSS

1.	Removed the header and footer classes after added emantic elements. 

2.	Removed repeated classes/rules that fell under simpler scopes and could be condensed:

      |BEFORE|AFTER|
      | --- | --- |
      |.benefit-lead<br>.benefit-brand<br>.benefit-cost |	.benefits div |
      |.benefit-lead h3<br>.benefit-brand h3<br>.benefit-cost h3 | .benefits h3 |
      |.benefit-lead img<br>.benefit-brand img<br>.benefit-cost img |	.benefits img |
      |.search-engine-optimization<br>.online-reputation-management<br>.social-media-marketing|	.content div |
      |.search-engine-optimization img<br>.online-reputation-management img<br>.social-media-marketing img|	.content img|
      |.search-engine-optimization h2<br>.online-reputation-management h2<br>.social-media-marketing h2|	.content h2 |
<br>

3.	Organized the CSS a little bit by moving related rules togteher and commenting each section.

4.	Created a section at the top for fonts specifically. 

5.  Changed the footer h2 scope to footer h4