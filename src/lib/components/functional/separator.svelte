<script lang="ts">
	export let orientation: 'horizontal' | 'vertical' = 'horizontal';
	export let thickness: 'thin' | 'normal' | 'thick' = 'thin';
	export let margin: 'none' | 'small' | 'default' | 'large' = 'small';

	const orientationClasses = {
		horizontal: 'w-full border-t',
		vertical: 'h-full border-l'
	};

	const thicknessClasses = {
		thin: 'border',
		normal: 'border-2',
		thick: 'border-4'
	};

	const marginClasses = {
		none: '',
		small: orientation === 'horizontal' ? 'my-2' : 'mx-2',
		default: orientation === 'horizontal' ? 'my-4' : 'mx-4',
		large: orientation === 'horizontal' ? 'my-8' : 'mx-8'
	};
</script>

<span
	class="inline {orientationClasses[orientation]} border-slate-8 {thicknessClasses[thickness]}
	{marginClasses[margin]}"
></span>
