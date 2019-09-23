export const removeMask = (str) => {
    return str.replace(/[\D]+/g,"");
}

export const ljust = ( string, width, padding ) => {
	padding = padding || " ";
	padding = padding.substr( 0, 1 );
	if ( string.length < width )
		return string + padding.repeat( width - string.length );
	else
		return string;
}

export const rjust = ( string, width, padding ) => {
	padding = padding || " ";
	padding = padding.substr( 0, 1 );
	if ( string.length < width )
		return padding.repeat( width - string.length ) + string;
	else
		return string;
}

export const center = ( string, width, padding ) => {
	padding = padding || " ";
	padding = padding.substr( 0, 1 );
	if ( string.length < width ) {
		var len		= width - string.length;
		var remain	= ( len % 2 == 0 ) ? "" : padding;
		var pads	= padding.repeat( parseInt( len / 2 ) );
		return pads + string + pads + remain;
	}
	else
		return string;
}

export const truncate = ( string, length ) => {
	try {
		if(string.length > length)
			return `${string.slice(0, length)}...`
		else
			return string
	} catch (error) {
		return string	
	}
}