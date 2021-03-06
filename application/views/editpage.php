<style>
    .error
    {
        color: red;  
    }
</style>

<!-- Right side column. Contains the navbar and content of the page -->
<aside class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>
            <?php echo $welcome->loadpo('Add New Page') ?>
        </h1>
        <ol class="breadcrumb">
            <li><a href="<?php echo base_url() ?>"><i class="fa fa-dashboard"></i><?php echo $welcome->loadPo('Dashboard') ?></a></li>
            <li><a href="<?php echo base_url() ?>pages"><i class="glyphicon glyphicon-th-list"></i><?php echo $welcome->loadPo('Pages') ?></a></li>
            <li class="active"><?php echo $welcome->loadPo('Add New'); ?></li>
        </ol>
    </section>
    <!-- Main content -->
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div class="box box-danger">
                    <div class="box-header">
                        <h3 class="box-title"><?php echo $welcome->loadpo('Add New Page') ?></h3>
                    </div>
                    <div class="box-body">
                        <form action="" method="post" id="pageid">
                            <input type="hidden" name="user_id" value="">
                            <div class="form-group">
                                <label>Page Title</label>
                                <input class="form-control" name=page_title placeholder="Page Title" type="text" value="<?php echo $result[0]->page_title; ?>">
                            <?php echo form_error('page_title', '<span class="text-danger">', '</span>'); ?>
                            </div>
                            <div class="form-group">
                                <label>Page Description</label><br/>
                               
                                    <textarea id="editor1" name="page_description" rows="10" cols="80" ><?php echo $result[0]->page_description; ?></textarea> 
                                    <?php echo form_error('page_description', '<span class="text-danger">', '</span>'); ?>
                                
                            </div>
                            <div class="row">    
                                <div class="form-group col-lg-5">

                                </div>
                            </div>
                            <button type="submit" name="submit" value="Update" class="btn btn-primary"><?php echo $welcome->loadPo('Update'); ?></button>
                            &nbsp; &nbsp;<a href="<?php echo base_url() ?>pages" class="btn btn-default"><?php echo $welcome->loadPo('Cancel') ?></a>
                        </form>
                    </div><!-- /.box-body -->
                </div><!-- /.box -->
            </div><!-- /.col (left) -->
        </div><!-- /.row -->                    
    </section><!-- /.content -->
</aside><!-- /.right-side -->

