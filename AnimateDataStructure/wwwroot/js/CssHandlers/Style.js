export class Style
{
    getStyle()
    {
        let style = document.getElementsByTagName('style')[0];

        if (style == undefined || style == null)
        {
            style = document.createElement('style');

            document.appendChild(style);
        }

        return style;
    }


    getStyleClassText()
    {
        let style = this.getStyle();

        let styleText = style.innerHTML;

        return styleText;
    }
}